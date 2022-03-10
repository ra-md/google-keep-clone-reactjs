import { test, expect, Page } from "@playwright/test";

const editLabelsSelector = '[aria-label="Edit labels"]';
const createLabelInputSelector = '[placeholder="Create new label"]';
const saveLabelSelector = '[aria-label="Save label"]';
const closeEditLabelSelector = '[aria-label="Close edit label"]';
const openAddLabelSelector = '[aria-label="Add label"]';
const closeAddLabelSelector = '[aria-label="Close add label"]';
const searchLabelInputSelector = '[placeholder="Search label name"]';
const labelListSelector = '[data-test-id=label-list]';
const sidebarListSelector = '[data-test-id=sidebar-list]';
const searchLabelListSelector = "[data-test-id=search-label-list]";

const labels = ["label 1", "label 2"];
const note = { title: "note 1 title", text: "note 1 text" };

test.beforeEach(async ({ page }) => {
  await page.goto("localhost:3000");

  await page.locator('[placeholder="Take a note..."]').fill(note.title);
  await page.locator('[placeholder="Title"]').fill(note.text);
  await page.locator('[aria-label="close create note"]').click();
});

test.describe("Label", () => {
  test("should allow users to add new labels", async ({ page }) => {
    await page.locator(editLabelsSelector).click();

    await page.locator(createLabelInputSelector).fill(labels[0]);
    await page.locator(saveLabelSelector).click();
    await expect(page.locator(labelListSelector)).toContainText(labels[0]);

    await page.locator(closeEditLabelSelector).click();

    await expect(page.locator(sidebarListSelector)).toContainText(labels[0]);

    await page.locator(openAddLabelSelector).click();
    await expect(page.locator(searchLabelListSelector)).toContainText(
      labels[0]
    );
    await page.locator(closeAddLabelSelector).click();

    await page.locator(editLabelsSelector).click();
    await page.locator(createLabelInputSelector).fill(labels[1]);
    await page.locator(saveLabelSelector).click();
    await expect(page.locator(labelListSelector)).toContainText(labels);

    await page.locator(closeEditLabelSelector).click();

    await expect(page.locator(sidebarListSelector)).toContainText(labels);

    await page.locator(openAddLabelSelector).click();
    await expect(page.locator(searchLabelListSelector)).toContainText(labels);
  });

  test("should allow users to update labels", async ({ page }) => {
    await page.locator(editLabelsSelector).click();

    await page.locator(createLabelInputSelector).fill(labels[0]);
    await page.locator(saveLabelSelector).click();

    const updateLabel = "update label 1";

    await page.locator(createLabelInputSelector).fill(updateLabel);
    await page.locator(saveLabelSelector).click();
    await expect(page.locator(labelListSelector)).toContainText(updateLabel);

    await page.locator(closeEditLabelSelector).click();

    await expect(page.locator(sidebarListSelector)).toContainText(updateLabel);
    await page.locator(openAddLabelSelector).click();
    await expect(page.locator(searchLabelListSelector)).toContainText(
      updateLabel
    );
  });

  test("should allow users to delete labels", async ({ page }) => {
    await page.locator(editLabelsSelector).click();

    await page.locator(createLabelInputSelector).fill(labels[0]);
    await page.locator(saveLabelSelector).click();

    await page.locator('[aria-label="Delete label"]').click();
    await expect(page.locator(labelListSelector)).not.toContainText(labels[0]);

    await page.locator(closeEditLabelSelector).click();

    await expect(page.locator(sidebarListSelector)).not.toContainText(
      labels[0]
    );
    await page.locator(openAddLabelSelector).click();
    await expect(page.locator(searchLabelListSelector)).not.toContainText(
      labels[0]
    );
  });
});

test.describe("Add label and remove label", () => {
  test.beforeEach(async ({ page }) => {
    await page.locator(editLabelsSelector).click();

    await page.locator(createLabelInputSelector).fill(labels[0]);
    await page.locator(saveLabelSelector).click();

    await page.locator(closeEditLabelSelector).click();
  });

  test("should allow users to add label", async ({ page }) => {
    await page.locator(openAddLabelSelector).click();

    await page
      .locator(`${searchLabelListSelector} >> text=${labels[0]}`)
      .check();
    await page.locator(closeAddLabelSelector).click();

    await page.click('[aria-label="update this note"]');

    await expect(page.locator(".note-label-list")).toContainText(labels[0]);
  });

  test("should allow users to remove label from notes", async ({ page }) => {
    await page.locator(openAddLabelSelector).click();

    await page
      .locator(`${searchLabelListSelector} >> text=${labels[0]}`)
      .check();
    await page.locator(closeAddLabelSelector).click();

    await page.click('[aria-label="update this note"]');
    await page.click('[aria-label="Remove label"]');

    await expect(page.locator(".note-label-list")).not.toContainText(labels[0]);
  });

  test("route label should display correct notes", async ({ page }) => {
    await page.locator(openAddLabelSelector).click();

    await page
      .locator(`${searchLabelListSelector} >> text=${labels[0]}`)
      .check();
    await page.locator(closeAddLabelSelector).click();

    await page.locator(`[href="/label/${labels[0]}"]`).click();

    await expect(page.locator(`text="${note.title}"`)).toBeVisible();
    await expect(page.locator(`text="${note.text}"`)).toBeVisible();
  });
});

test.describe("Search label", () => {
  test.beforeEach(async ({ page }) => {
    await page.locator(editLabelsSelector).click();

    await page.locator(createLabelInputSelector).fill(labels[0]);
    await page.locator(saveLabelSelector).click();

    await page.locator(createLabelInputSelector).fill(labels[1]);
    await page.locator(saveLabelSelector).click();

    await page.locator(closeEditLabelSelector).click();
  });

  test("Should display search results", async ({ page }) => {
    await page.locator(openAddLabelSelector).click();

    await expect(page.locator(searchLabelListSelector)).toContainText(labels);

    await page.locator(searchLabelInputSelector).fill(labels[0]);
    await page.locator(searchLabelInputSelector).press("Enter");

    await expect(page.locator(searchLabelListSelector)).toContainText(
      labels[0]
    );
  });

  test("Should display all labels if search does not match any label", async ({
    page,
  }) => {
    await page.locator(openAddLabelSelector).click();

    await expect(page.locator(searchLabelListSelector)).toContainText(labels);

    await page.locator(searchLabelInputSelector).fill("null");
    await page.locator(searchLabelInputSelector).press("Enter");

    await expect(page.locator(searchLabelListSelector)).toContainText(labels);
  });
});
