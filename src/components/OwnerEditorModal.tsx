import { useEffect, useState, type FormEvent } from 'react';
import { RotateCcw, Save, X } from 'lucide-react';
import type { BusinessInfo, EditableStoreConfig, MenuItem } from '../types/restaurant';

interface OwnerEditorModalProps {
  isOpen: boolean;
  config: EditableStoreConfig;
  onSave: (nextConfig: EditableStoreConfig) => void;
  onReset: () => void;
  onClose: () => void;
}

export function OwnerEditorModal({
  isOpen,
  config,
  onSave,
  onReset,
  onClose,
}: OwnerEditorModalProps) {
  const [businessDraft, setBusinessDraft] = useState<BusinessInfo>(
    config.businessInfo
  );
  const [menuDraft, setMenuDraft] = useState<MenuItem[]>(config.menuItems);

  useEffect(() => {
    if (isOpen) {
      setBusinessDraft(config.businessInfo);
      setMenuDraft(config.menuItems);
    }
  }, [isOpen, config]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateDish = (
    id: string,
    field: 'price' | 'note' | 'available',
    value: string | boolean
  ) => {
    setMenuDraft((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    onSave({
      businessInfo: businessDraft,
      menuItems: menuDraft,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="owner-editor-title"
      className="fixed inset-0 z-50 bg-[#25201D]/82 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#FAF7F0] border border-[#C6A052]/50 rounded-sm overflow-hidden my-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C6A052]/30 bg-[#25201D]">
          <div>
            <p className="text-xs font-medium text-[#C6A052]">
              Restaurant Management
            </p>
            <h2
              id="owner-editor-title"
              className="font-editorial text-2xl sm:text-3xl font-semibold text-[#FAF7F0]"
            >
              Edit Opening Hours &amp; Menu Details
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="w-10 h-10 inline-flex items-center justify-center text-[#F3EBDD]/75 hover:text-[#C6A052] rounded-sm cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Hours & Contact Details */}
          <fieldset className="space-y-4">
            <legend className="font-editorial text-xl font-semibold text-[#25201D] pb-2 border-b border-[#C6A052]/30 w-full">
              Hours &amp; Contact Information
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="edit-hours"
                  className="block text-xs font-medium text-[#392D28] mb-1.5"
                >
                  Opening Hours Display
                </label>
                <input
                  id="edit-hours"
                  type="text"
                  value={businessDraft.openingHours}
                  onChange={(e) =>
                    setBusinessDraft((p) => ({
                      ...p,
                      openingHours: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD] text-[#25201D] border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-hours-note"
                  className="block text-xs font-medium text-[#392D28] mb-1.5"
                >
                  Hours Subnote
                </label>
                <input
                  id="edit-hours-note"
                  type="text"
                  value={businessDraft.closingNote}
                  onChange={(e) =>
                    setBusinessDraft((p) => ({
                      ...p,
                      closingNote: e.target.value,
                    }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#F3EBDD] text-[#25201D] border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm"
                />
              </div>
            </div>
          </fieldset>

          {/* Editable Dish Details */}
          <fieldset className="space-y-4">
            <legend className="font-editorial text-xl font-semibold text-[#25201D] pb-2 border-b border-[#C6A052]/30 w-full">
              Menu Items (Optional Pricing &amp; Notes)
            </legend>

            <div className="space-y-4">
              {menuDraft.map((dish) => (
                <div
                  key={dish.id}
                  className="p-4 bg-[#F3EBDD] border border-[#C6A052]/40 rounded-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                >
                  <div className="sm:col-span-4">
                    <p className="font-editorial text-lg font-semibold text-[#25201D]">
                      {dish.name}
                    </p>
                    <p className="text-xs font-medium text-[#762B35]">{dish.category}</p>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor={`price-${dish.id}`}
                      className="block text-[11px] font-medium text-[#392D28]/80 mb-1"
                    >
                      Price (Optional)
                    </label>
                    <input
                      id={`price-${dish.id}`}
                      type="text"
                      value={dish.price}
                      onChange={(e) =>
                        updateDish(dish.id, 'price', e.target.value)
                      }
                      placeholder="e.g. PKR 1,800"
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F0] text-[#25201D] placeholder:text-[#392D28]/45 border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm"
                    />
                  </div>

                  <div className="sm:col-span-5">
                    <label
                      htmlFor={`note-${dish.id}`}
                      className="block text-[11px] font-medium text-[#392D28]/80 mb-1"
                    >
                      Short Note (Optional)
                    </label>
                    <input
                      id={`note-${dish.id}`}
                      type="text"
                      value={dish.note}
                      onChange={(e) =>
                        updateDish(dish.id, 'note', e.target.value)
                      }
                      placeholder="Serving note or portion size..."
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F0] text-[#25201D] placeholder:text-[#392D28]/45 border border-[#C6A052]/40 focus:border-[#762B35] focus:outline-none rounded-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <div className="pt-4 border-t border-[#C6A052]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#392D28] hover:text-[#762B35] border border-[#392D28]/25 hover:border-[#762B35] rounded-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-medium text-[#25201D] border border-[#25201D]/25 hover:border-[#25201D] rounded-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-[#FAF7F0] bg-[#762B35] hover:bg-[#5E2129] border border-[#C6A052]/40 rounded-sm transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" aria-hidden="true" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
