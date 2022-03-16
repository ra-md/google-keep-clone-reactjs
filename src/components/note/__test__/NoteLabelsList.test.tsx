import { render, screen, userEvent } from "~/utils/test-utils";
import NoteLabelsList from "../NoteLabelsList";

describe('NoteLabelList', () => {
	it('should render label list correctly', () => {
		render(<NoteLabelsList noteId="1" labelId={["1"]}/>)
	})
})
