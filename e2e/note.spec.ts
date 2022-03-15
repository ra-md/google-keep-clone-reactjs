import { test, expect } from "@playwright/test";

const notes = [
  {
    title: "note 1 title",
    text: "note 1 text",
  },
  {
    title: "",
    text: "note 2 text",
  },
];

const textInputSelector = '[placeholder="Take a note..."]';
const titleInputSelector = '[placeholder="Title"]';
const closeCreateNoteSelector = '[aria-label="close create note"]';
const updateNoteSelector = '[aria-label="update note"]';
const searchInputSelector = '[placeholder="Search"]';
const noteListSelector = ".note-list";

test.beforeEach(async ({ page }) => {
  await page.goto("localhost:3000");
});

test.describe("Note", () => {
  test("should allow users to add new notes", async ({ page }) => {
    const flatNotes = notes.map(({ title, text }) => [title, text]).flat();

    await page.locator(textInputSelector).fill(notes[0].text);
    await page.locator(titleInputSelector).fill(notes[0].title);

    await page.locator(closeCreateNoteSelector).click();

    await expect(page.locator(noteListSelector)).toContainText([
      notes[0].text,
      notes[0].title,
    ]);

    await page.locator(textInputSelector).fill(notes[1].text);
    await page.locator(titleInputSelector).fill(notes[1].title);

    await page.locator(closeCreateNoteSelector).click();

    await expect(page.locator(noteListSelector)).toContainText(flatNotes);

    await page.reload();

    await expect(page.locator(noteListSelector)).toContainText(flatNotes);
  });

  test("should clear inputs when an item is added", async ({ page }) => {
    await page.locator(textInputSelector).fill(notes[0].text);
    await page.locator(titleInputSelector).fill(notes[0].title);

    await page.locator(closeCreateNoteSelector).click();

    await page.locator(textInputSelector).click();

    await expect(page.locator(textInputSelector)).toBeEmpty();
    await expect(page.locator(titleInputSelector)).toBeEmpty();
  });

  test("should allow users to delete notes", async ({ page }) => {
    await page.locator(textInputSelector).fill(notes[0].text);
    await page.locator(titleInputSelector).fill(notes[0].title);

    await page.locator(closeCreateNoteSelector).click();

    await expect(page.locator(noteListSelector)).toContainText([
      notes[0].text,
      notes[0].title,
    ]);

    await page.locator('[aria-label="Delete note"]').click();

    await expect(page.locator(noteListSelector)).not.toContainText([
      notes[0].text,
      notes[0].title,
    ]);
  });

  test("should allow users to update notes", async ({ page }) => {
    await page.locator(textInputSelector).fill(notes[0].text);
    await page.locator(titleInputSelector).fill(notes[0].title);

    await page.locator(closeCreateNoteSelector).click();

    const updateText = "update note 1 text";
    const updateTitle = "update note 1 title";

    await page.locator('[aria-label="update this note"]').click()

    await page.locator(`[data-test-id="update title"]`).fill(updateText);
    await page.locator(`[data-test-id="update text"]`).fill(updateTitle);

    await page.locator(updateNoteSelector).click();

    await expect(page.locator(noteListSelector)).toContainText([
      updateTitle,
      updateText,
    ]);
  });
});

test.describe("Search notes", () => {
  test.beforeEach(async ({ page }) => {
    await page.locator(textInputSelector).fill(notes[0].text);
    await page.locator(titleInputSelector).fill(notes[0].title);

    await page.locator(closeCreateNoteSelector).click();

    await page.locator(textInputSelector).fill(notes[1].text);
    await page.locator(titleInputSelector).fill(notes[1].title);

    await page.locator(closeCreateNoteSelector).click();
  });

  test('Should display "No matching results." when no there are no results', async ({
    page,
  }) => {
    await page.locator(searchInputSelector).fill("null");
    await page.locator(searchInputSelector).press("Enter");

    await expect(page.locator("text=No matching results.")).toBeVisible();
  });

  test("Should display correct results", async ({ page }) => {
    await page.locator(searchInputSelector).fill(notes[0].text);
    await page.locator(searchInputSelector).press("Enter");

    await expect(page.locator(`text=${notes[0].text}`)).toBeVisible();

    await page.locator(searchInputSelector).fill("note");
    await page.locator(searchInputSelector).press("Enter");

    await expect(page.locator(`text=${notes[0].text}`)).toBeVisible();
    await expect(page.locator(`text=${notes[1].text}`)).toBeVisible();
  });

  test("Should clear search field when users leave search route", async ({
    page,
  }) => {
    await page.locator(searchInputSelector).fill(notes[0].text);
    await page.locator(searchInputSelector).press("Enter");
    await page.goBack();
    await expect(page.locator(searchInputSelector)).toBeEmpty();
  });
});
