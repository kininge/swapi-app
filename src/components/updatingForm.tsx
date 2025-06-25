import React from 'react';

type UPDATING_FORM_PROP = {
  updatedCharacter: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSave: () => void;
  handleCancel: () => void;
};

const UpdatingForm: React.FC<UPDATING_FORM_PROP> = ({
  updatedCharacter,
  handleChange,
  handleSave,
  handleCancel,
}) => {
  return (
    <div className="space-y-2 mt-4">
      {['gender', 'height', 'mass', 'skin_color', 'hair_color', 'eye_color'].map((field) => (
        <div key={field}>
          <label htmlFor={field} className="block text-sm font-medium capitalize mb-1">
            {field.replace('_', ' ')}
          </label>
          {field === 'gender' ? (
            <select
              id="gender"
              name="gender"
              value={updatedCharacter.gender}
              onChange={(e) => {
                handleChange(e);
              }}
              className="w-full px-3 outline-none  py-1 border bg-theme-background border-theme-border focus:border-theme-primary rounded-3xl"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="n/a">No Gender</option>
            </select>
          ) : (
            <input
              id={field}
              type="text"
              name={field}
              value={updatedCharacter[field] || ''}
              onChange={handleChange}
              className="w-full px-3 outline-none py-1 border bg-theme-background border-theme-border focus:border-theme-primary rounded-3xl"
            />
          )}
        </div>
      ))}
      <div className="flex gap-4 mt-2">
        <button
          onClick={handleSave}
          className="bg-theme-primary hover:bg-theme-primaryHover px-4 py-1 rounded text-white"
        >
          Save
        </button>
        <button onClick={handleCancel} className="bg-gray-500 px-4 py-1 rounded text-white">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdatingForm;
