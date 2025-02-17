import { FC, FormEvent } from 'react';

interface ColorDialogProps {
  readonly value: string;
  saveInformation: (e: FormEvent<HTMLFormElement>) => void;
}

const ColorDialog: FC<ColorDialogProps> = ({ value, saveInformation }) => (
  <dialog
    id="colorDialog"
    className="fixed z-50 rounded-2xl border-4 p-2 text-deep-sapphire"
    open
  >
    <div className="w-full max-w-xs bg-white p-6 text-deep-sapphire md:max-w-md">
      <h3 className="mb-4 text-center text-lg font-bold md:text-xl lg:text-2xl">
        Select A Color
      </h3>
      <form
        method="dialog"
        onSubmit={e => saveInformation(e)}
        className="flex flex-col items-center"
      >
        <input
          type="color"
          id="colorSelect"
          name="colorSelect"
          defaultValue={value ? value : '#ffffff'}
          className="m-2 size-20 rounded-2xl border-2 p-1.5"
        />

        <button
          type="submit"
          className="m-2 rounded-2xl border-4 p-2 text-center text-sm font-bold hover:bg-deep-sapphire hover:text-white"
        >
          Done
        </button>
      </form>
    </div>
  </dialog>
);

export default ColorDialog;
