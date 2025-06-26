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
    <div data-testid="updating-properties-container" className="space-y-2 mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {['gender', 'height', 'mass', 'skin_color', 'hair_color', 'eye_color'].map((field) => (
          <div key={field} className="flex flex-col">
            <label
              htmlFor={field}
              className="block text-sm font-semibold text-theme-primary capitalize mb-1"
            >
              {field.replace('_', ' ')}
            </label>

            {field === 'gender' ? (
              <select
                id="gender"
                name="gender"
                data-testid="updating-gender"
                value={updatedCharacter.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-theme-border bg-theme-background text-theme-text rounded-2xl focus:outline-none focus:ring-2 focus:ring-theme-primary"
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
                data-testid={`updating-${field}`}
                value={updatedCharacter[field] || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-theme-border bg-theme-background text-theme-text rounded-2xl focus:outline-none focus:ring-2 focus:ring-theme-primary"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-2">
        <button
          onClick={handleSave}
          data-testid="save-updates"
          className="bg-theme-primary hover:bg-theme-primaryHover px-4 py-1 rounded text-white"
        >
          Save
        </button>
        <button
          data-testid="cancel-updates"
          onClick={handleCancel}
          className="bg-gray-500 px-4 py-1 rounded text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdatingForm;
