import { RootState } from "./store/store";
import { useSelector, useDispatch } from "react-redux";
import { createLabel, updateLabel, deleteLabel } from "./store/labelSlice";
import Button from "./components/ui/Button";

export default function Redux() {
  const dispatch = useDispatch();
  const labels = useSelector((state: RootState) => state.label.labels);

  const label = {
    id: "1",
    labelName: `label 3 update`,
  };

  return (
    <div>
      <Button onClick={() => dispatch(deleteLabel("1"))}>dispatch</Button>
      {labels.length > 0 ? (
        <>
          {labels.map((label) => {
            return (
              <div key={label.id}>
                <h1>
                  {label.labelName}, id: {label.id}
                </h1>
              </div>
            );
          })}
        </>
      ) : (
        <h1>0.</h1>
      )}
    </div>
  );
}
