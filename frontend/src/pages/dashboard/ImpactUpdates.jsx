import { useEffect, useMemo, useRef, useState } from "react";
import { impactGalleryService, impactUpdateService, projectService } from "../../services/adminServices";
import { getAssetUrl } from "../../services/clientService";

const initialStoryForm = {
  project_id: "",
  title: "",
  description: "",
  support_summary: "",
  amount_delivered: "",
  people_helped: "",
  completion_date: "",
  status: "draft",
};

const statusStyles = {
  draft: "bg-[#FFF2D9] text-[#A86D00]",
  published: "bg-[#E5F6EA] text-[#2E7D42]",
  archived: "bg-[#EEF1F5] text-[#536078]",
};

const formatMoney = (value) => new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format(Number(value || 0));

const formatDateInput = (value) => {
  if (!value) return "";
  return String(value).slice(0, 10);
};

const StoryForm = ({ projects, story, onClose, onSaved }) => {
  const [form, setForm] = useState(() => story ? {
    project_id: String(story.project_id || ""),
    title: story.title || "",
    description: story.description || "",
    support_summary: story.support_summary || "",
    amount_delivered: story.amount_delivered ?? "",
    people_helped: story.people_helped ?? "",
    completion_date: formatDateInput(story.completion_date),
    status: story.status || "draft",
  } : initialStoryForm);
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (beforeImage?.preview) URL.revokeObjectURL(beforeImage.preview);
      if (afterImage?.preview) URL.revokeObjectURL(afterImage.preview);
    };
  }, [beforeImage, afterImage]);

  const chooseImage = (event, setter) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Use JPG, PNG, WEBP, or GIF images no larger than 5 MB.");
      event.target.value = "";
      return;
    }
    setter((current) => {
      if (current?.preview) URL.revokeObjectURL(current.preview);
      return { file, preview: URL.createObjectURL(file) };
    });
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const payload = {
        ...form,
        project_id: Number(form.project_id),
        amount_delivered: Number(form.amount_delivered || 0),
        people_helped: Number(form.people_helped || 0),
      };
      if (story) await impactUpdateService.update(story.id, payload, beforeImage?.file, afterImage?.file);
      else await impactUpdateService.create(payload, beforeImage?.file, afterImage?.file);
      await onSaved();
      onClose();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = "mt-2 h-12 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none focus:border-[#D0A733]";
  const imageInputClass = "mt-2 flex min-h-36 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#D8DEE8] bg-[#F8FAFD] text-center hover:border-[#D0A733]";
  const change = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07142D]/60 p-4" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <section className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <header className="flex items-start justify-between gap-4 border-b border-[#E7EAF0] px-6 py-5">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">Completed Support</p><h2 className="mt-1 text-2xl font-extrabold text-[#07142D]">{story ? "Edit impact story" : "Add an impact story"}</h2>{story ? <p className="mt-2 text-sm font-semibold text-[#687083]">Update the story content or click an image to replace it.</p> : null}</div>
          <button type="button" onClick={onClose} aria-label="Close form" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA] text-[#536078]"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </header>
        <form onSubmit={handleSubmit} className="grid gap-5 p-6 sm:grid-cols-2">
          {error ? <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 sm:col-span-2">{error}</div> : null}
          <label className="text-sm font-extrabold text-[#07142D] sm:col-span-2">Support Case<select name="project_id" value={form.project_id} onChange={change} required className={fieldClass}><option value="" disabled>Select a support case</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select></label>
          <label className="text-sm font-extrabold text-[#07142D] sm:col-span-2">Story Title<input name="title" value={form.title} onChange={change} required placeholder="Example: School materials delivered" className={fieldClass} /></label>
          <label className="text-sm font-extrabold text-[#07142D] sm:col-span-2">Public Description<textarea name="description" value={form.description} onChange={change} required rows="4" placeholder="Describe what happened and the change it created." className={`${fieldClass} h-auto py-3`} /></label>
          <label className="text-sm font-extrabold text-[#07142D] sm:col-span-2">Support Delivered<textarea name="support_summary" value={form.support_summary} onChange={change} rows="2" placeholder="Items, services, construction, visits, or other support delivered." className={`${fieldClass} h-auto py-3`} /></label>
          <label className="text-sm font-extrabold text-[#07142D]">Amount Delivered (USD)<input type="number" min="0" step="0.01" name="amount_delivered" value={form.amount_delivered} onChange={change} className={fieldClass} /></label>
          <label className="text-sm font-extrabold text-[#07142D]">People Helped<input type="number" min="0" name="people_helped" value={form.people_helped} onChange={change} className={fieldClass} /></label>
          <label className="text-sm font-extrabold text-[#07142D]">Completion Date<input type="date" name="completion_date" value={form.completion_date} onChange={change} className={fieldClass} /></label>
          <label className="text-sm font-extrabold text-[#07142D]">Publishing Status<select name="status" value={form.status} onChange={change} className={fieldClass}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
          <label className="text-sm font-extrabold text-[#07142D]">Before Image (optional)<span className={`${imageInputClass} group relative`}>{beforeImage ? <img src={beforeImage.preview} alt="Before preview" className="h-36 w-full object-cover" /> : story?.before_image_url || story?.image_url ? <img src={getAssetUrl(story.before_image_url || story.image_url)} alt="Current before" className="h-36 w-full object-cover" /> : <><span className="material-symbols-outlined text-[32px] text-[#D0A733]">add_photo_alternate</span><span className="mt-2 text-xs font-bold text-[#687083]">Upload before image</span></>}{story ? <span className="absolute inset-x-3 bottom-3 rounded bg-[#07142D]/85 px-3 py-2 text-center text-xs font-extrabold text-white opacity-0 transition group-hover:opacity-100">Click image to change</span> : null}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => chooseImage(event, setBeforeImage)} className="sr-only" /></span></label>
          <label className="text-sm font-extrabold text-[#07142D]">After Image (optional)<span className={`${imageInputClass} group relative`}>{afterImage ? <img src={afterImage.preview} alt="After preview" className="h-36 w-full object-cover" /> : story?.after_image_url || story?.image_url ? <img src={getAssetUrl(story.after_image_url || story.image_url)} alt="Current after" className="h-36 w-full object-cover" /> : <><span className="material-symbols-outlined text-[32px] text-[#D0A733]">add_photo_alternate</span><span className="mt-2 text-xs font-bold text-[#687083]">Upload after image</span></>}{story ? <span className="absolute inset-x-3 bottom-3 rounded bg-[#07142D]/85 px-3 py-2 text-center text-xs font-extrabold text-white opacity-0 transition group-hover:opacity-100">Click image to change</span> : null}<input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => chooseImage(event, setAfterImage)} className="sr-only" /></span></label>
          <div className="flex justify-end gap-3 border-t border-[#E7EAF0] pt-5 sm:col-span-2"><button type="button" onClick={onClose} className="h-11 rounded-lg border border-[#DDE2EA] px-5 text-sm font-extrabold text-[#536078]">Cancel</button><button type="submit" disabled={isSubmitting} className="h-11 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white disabled:opacity-60">{isSubmitting ? "Saving..." : story ? "Update Story" : "Save Story"}</button></div>
        </form>
      </section>
    </div>
  );
};

const GalleryForm = ({ projects, existingImages = [], onClose, onUploaded }) => {
  const [projectId, setProjectId] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [currentCaption, setCurrentCaption] = useState("");
  const [slotImages, setSlotImages] = useState({});
  const slotImagesRef = useRef({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { slotImagesRef.current = slotImages; }, [slotImages]);
  useEffect(() => () => Object.values(slotImagesRef.current).forEach((item) => URL.revokeObjectURL(item.preview)), []);

  const occupiedPositions = useMemo(() => new Set(existingImages.map((image) => Number(image.gallery_position)).filter((position) => position >= 1 && position <= 4)), [existingImages]);
  const draftPositions = useMemo(() => new Set(Object.keys(slotImages).map(Number)), [slotImages]);
  const availablePositions = [1, 2, 3, 4].filter((position) => !occupiedPositions.has(position) && !draftPositions.has(position));
  const uploadEntries = Object.entries(slotImages).map(([position, item]) => ({ position: Number(position), ...item })).sort((a, b) => a.position - b.position);

  const chooseFile = (event) => {
    const file = event.target.files?.[0];
    const position = Number(selectedPosition);
    if (!position) {
      setError("Choose an image position before selecting a file.");
      event.target.value = "";
      return;
    }
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Use JPG, PNG, WEBP, or GIF images no larger than 5 MB.");
      event.target.value = "";
      return;
    }
    setSlotImages((current) => {
      if (current[position]?.preview) URL.revokeObjectURL(current[position].preview);
      return { ...current, [position]: { file, preview: URL.createObjectURL(file), caption: currentCaption } };
    });
    setSelectedPosition("");
    setCurrentCaption("");
    setError("");
    event.target.value = "";
  };

  const changeSlotPosition = (currentPosition, nextPosition) => {
    const targetPosition = Number(nextPosition);
    if (!targetPosition || occupiedPositions.has(targetPosition)) return;
    setSlotImages((current) => {
      const next = { ...current };
      const currentItem = next[currentPosition];
      if (!currentItem) return current;
      next[currentPosition] = next[targetPosition];
      if (!next[currentPosition]) delete next[currentPosition];
      next[targetPosition] = currentItem;
      return next;
    });
  };

  const updateSlotCaption = (position, caption) => {
    setSlotImages((current) => ({ ...current, [position]: { ...current[position], caption } }));
  };

  const removeSlotImage = (position) => {
    setSlotImages((current) => {
      if (current[position]?.preview) URL.revokeObjectURL(current[position].preview);
      const next = { ...current };
      delete next[position];
      return next;
    });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!uploadEntries.length) return setError("Please choose at least one image.");
    setIsSubmitting(true);
    setError("");
    try {
      await impactGalleryService.upload(projectId, uploadEntries.map((item) => item.file), uploadEntries.map((item) => item.caption), uploadEntries.map((item) => item.position));
      await onUploaded();
      onClose();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07142D]/60 p-4" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <section className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <header className="flex items-start justify-between gap-4 border-b border-[#E7EAF0] px-6 py-5"><div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">Gallery</p><h2 className="mt-1 text-2xl font-extrabold text-[#07142D]">Upload gallery photos</h2></div><button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA]"><span className="material-symbols-outlined text-[20px]">close</span></button></header>
        <form onSubmit={submit} className="p-6">
          {error ? <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div> : null}
          <div className="mt-5 grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-extrabold text-[#07142D]">Upload Details</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-[#687083]">Choose a position, write that image caption, then upload one image.</p>
              </div>
              <label className="block text-sm font-extrabold text-[#07142D]">Support Case<select value={projectId} onChange={(event) => setProjectId(event.target.value)} required className="mt-2 h-12 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold"><option value="" disabled>Select a support case</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select></label>
              <label className="block text-sm font-extrabold text-[#07142D]">Image Position<select value={selectedPosition} onChange={(event) => setSelectedPosition(event.target.value)} className="mt-2 h-12 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none focus:border-[#D0A733]"><option value="">Select image position</option>{[1, 2, 3, 4].map((position) => <option key={position} value={position} disabled={occupiedPositions.has(position) || draftPositions.has(position)}>{position}{occupiedPositions.has(position) ? " - already uploaded" : draftPositions.has(position) ? " - selected" : ""}</option>)}</select></label>
              <label className="block text-sm font-extrabold text-[#07142D]">Caption for this image (optional)<input value={currentCaption} onChange={(event) => setCurrentCaption(event.target.value)} placeholder="Example: Materials delivered to the school" className="mt-2 h-12 w-full rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold outline-none focus:border-[#D0A733]" /></label>
              <label className={`flex min-h-52 flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D8DEE8] bg-[#F8FAFD] px-5 py-6 text-center ${selectedPosition ? "cursor-pointer hover:border-[#D0A733]" : "cursor-not-allowed opacity-70"}`}><span className="material-symbols-outlined text-[38px] text-[#D0A733]">add_photo_alternate</span><span className="mt-2 text-sm font-extrabold text-[#07142D]">{selectedPosition ? `Upload image ${selectedPosition}` : "Select a position first"}</span><span className="mt-1 text-xs font-semibold text-[#687083]">Upload one image for the selected position.</span><span className="mt-3 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-[#536078]">{uploadEntries.length ? `${uploadEntries.length} selected` : "No images selected"}</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" disabled={!selectedPosition} onChange={chooseFile} className="sr-only" /></label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((position) => (
                  <span key={position} className={`rounded-lg border px-2 py-2 text-center text-xs font-extrabold ${occupiedPositions.has(position) ? "border-[#DDE2EA] bg-[#EEF1F5] text-[#8A93A3]" : draftPositions.has(position) ? "border-[#D0A733] bg-[#FFF2D9] text-[#A86D00]" : "border-[#DDE2EA] bg-white text-[#536078]"}`}>
                    {position} {occupiedPositions.has(position) ? "Used" : draftPositions.has(position) ? "Selected" : "Open"}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-[#E2E6EE] bg-[#F8FAFD] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-[#07142D]">Gallery Preview</p>
                  <p className="mt-1 text-xs font-semibold text-[#687083]">Numbers show the upload order.</p>
                </div>
                {uploadEntries.length ? <span className="rounded-full bg-[#FFF2D9] px-3 py-1 text-xs font-extrabold text-[#A86D00]">{uploadEntries.length} image{uploadEntries.length === 1 ? "" : "s"}</span> : null}
              </div>

              <div className="mt-4 rounded-lg border border-dashed border-[#D8DEE8] bg-white p-3">
                <div className="grid min-h-[300px] gap-3 md:grid-cols-[1.18fr_1fr]">
                  <div className="relative overflow-hidden rounded-lg bg-[#EEF1F5]">
                    {slotImages[1] ? <img src={slotImages[1].preview} alt="Gallery upload 1" className="h-full min-h-[300px] w-full object-cover" /> : <div className="flex h-full min-h-[300px] items-center justify-center text-7xl font-extrabold text-[#CAD2DF]">1</div>}
                    <span className="absolute left-3 top-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#07142D] px-2 text-sm font-extrabold text-white">1</span>
                    {occupiedPositions.has(1) ? <span className="absolute bottom-3 left-3 rounded bg-white/90 px-2 py-1 text-[10px] font-extrabold text-[#536078]">Already uploaded</span> : null}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[1, 2, 3].map((fileIndex) => (
                      <div key={fileIndex} className="relative min-h-[142px] overflow-hidden rounded-lg bg-[#EEF1F5]">
                        {slotImages[fileIndex + 1] ? <img src={slotImages[fileIndex + 1].preview} alt={`Gallery upload ${fileIndex + 1}`} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-4xl font-extrabold text-[#CAD2DF]">{fileIndex + 1}</div>}
                        <span className="absolute left-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-[#07142D] px-2 text-xs font-extrabold text-white">{fileIndex + 1}</span>
                        {occupiedPositions.has(fileIndex + 1) ? <span className="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 text-[9px] font-extrabold text-[#536078]">Used</span> : null}
                      </div>
                    ))}
                  </div>
                </div>
                {!uploadEntries.length ? <p className="mt-3 text-center text-xs font-semibold text-[#687083]">Selected images will fill open numbered gallery positions.</p> : <p className="mt-3 text-center text-xs font-semibold text-[#687083]">Use the position dropdown to switch an image place.</p>}
                {uploadEntries.length ? (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {uploadEntries.map((item) => (
                      <div key={`${item.position}-${item.preview}`} className="rounded-lg border border-[#E2E6EE] bg-white p-3">
                        <label className="text-xs font-extrabold text-[#07142D]">Image position<select value={item.position} onChange={(event) => changeSlotPosition(item.position, event.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#DDE2EA] bg-white px-3 text-xs font-bold outline-none focus:border-[#D0A733]">{[1, 2, 3, 4].map((position) => <option key={position} value={position} disabled={occupiedPositions.has(position)}>{position}{occupiedPositions.has(position) ? " - already uploaded" : ""}</option>)}</select></label>
                        <label className="mt-3 block text-xs font-extrabold text-[#07142D]">Caption<input value={item.caption || ""} onChange={(event) => updateSlotCaption(item.position, event.target.value)} className="mt-1 h-10 w-full rounded-lg border border-[#DDE2EA] px-3 text-xs font-bold outline-none focus:border-[#D0A733]" /></label>
                        <button type="button" onClick={() => removeSlotImage(item.position)} className="mt-3 text-xs font-extrabold text-red-600">Remove image</button>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3 border-t border-[#E7EAF0] pt-5"><button type="button" onClick={onClose} className="h-11 rounded-lg border border-[#DDE2EA] px-5 text-sm font-extrabold text-[#536078]">Cancel</button><button type="submit" disabled={isSubmitting} className="h-11 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white disabled:opacity-60">{isSubmitting ? "Uploading..." : `Upload ${uploadEntries.length || ""} Photo${uploadEntries.length === 1 ? "" : "s"}`}</button></div>
        </form>
      </section>
    </div>
  );
};

const StoryImageForm = ({ story, onClose, onUpdated }) => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    return () => {
      if (beforeImage?.preview) URL.revokeObjectURL(beforeImage.preview);
      if (afterImage?.preview) URL.revokeObjectURL(afterImage.preview);
    };
  }, [beforeImage, afterImage]);

  const chooseImage = (event, setter) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Use JPG, PNG, WEBP, or GIF images no larger than 5 MB.");
      event.target.value = "";
      return;
    }
    setter((current) => {
      if (current?.preview) URL.revokeObjectURL(current.preview);
      return { file, preview: URL.createObjectURL(file) };
    });
    setError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!beforeImage && !afterImage) return setError("Upload a before image or an after image.");
    setIsSubmitting(true);
    setError("");
    try {
      await impactUpdateService.updateImages(story.id, beforeImage?.file, afterImage?.file);
      await onUpdated();
      onClose();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const imageInputClass = "mt-2 flex min-h-40 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#D8DEE8] bg-[#F8FAFD] text-center hover:border-[#D0A733]";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#07142D]/65 p-4" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <section className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <header className="flex items-start justify-between gap-4 border-b border-[#E7EAF0] px-6 py-5">
          <div><p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#D0A733]">Story Images</p><h2 className="mt-1 text-2xl font-extrabold text-[#07142D]">{story.title}</h2><p className="mt-2 text-sm font-semibold text-[#687083]">Click an image to choose a replacement.</p></div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA]"><span className="material-symbols-outlined text-[20px]">close</span></button>
        </header>
        <form onSubmit={submit} className="grid gap-5 p-6 sm:grid-cols-2">
          {error ? <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700 sm:col-span-2">{error}</div> : null}
          <label className="text-sm font-extrabold text-[#07142D]">Before Image<span className={`${imageInputClass} group relative`}>{beforeImage ? <img src={beforeImage.preview} alt="New before preview" className="h-40 w-full object-cover" /> : story.before_image_url || story.image_url ? <img src={getAssetUrl(story.before_image_url || story.image_url)} alt="Current before" className="h-40 w-full object-cover" /> : <><span className="material-symbols-outlined text-[32px] text-[#D0A733]">add_photo_alternate</span><span className="mt-2 text-xs font-bold text-[#687083]">Upload before image</span></>}<span className="absolute inset-x-3 bottom-3 rounded bg-[#07142D]/85 px-3 py-2 text-center text-xs font-extrabold text-white opacity-0 transition group-hover:opacity-100">Click image to change</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => chooseImage(event, setBeforeImage)} className="sr-only" /></span></label>
          <label className="text-sm font-extrabold text-[#07142D]">After Image<span className={`${imageInputClass} group relative`}>{afterImage ? <img src={afterImage.preview} alt="New after preview" className="h-40 w-full object-cover" /> : story.after_image_url || story.image_url ? <img src={getAssetUrl(story.after_image_url || story.image_url)} alt="Current after" className="h-40 w-full object-cover" /> : <><span className="material-symbols-outlined text-[32px] text-[#D0A733]">add_photo_alternate</span><span className="mt-2 text-xs font-bold text-[#687083]">Upload after image</span></>}<span className="absolute inset-x-3 bottom-3 rounded bg-[#07142D]/85 px-3 py-2 text-center text-xs font-extrabold text-white opacity-0 transition group-hover:opacity-100">Click image to change</span><input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => chooseImage(event, setAfterImage)} className="sr-only" /></span></label>
          <div className="flex justify-end gap-3 border-t border-[#E7EAF0] pt-5 sm:col-span-2"><button type="button" onClick={onClose} className="h-11 rounded-lg border border-[#DDE2EA] px-5 text-sm font-extrabold text-[#536078]">Cancel</button><button type="submit" disabled={isSubmitting} className="h-11 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white disabled:opacity-60">{isSubmitting ? "Saving..." : "Update Images"}</button></div>
        </form>
      </section>
    </div>
  );
};

const ImpactUpdates = () => {
  const [activeTab, setActiveTab] = useState("stories");
  const [updates, setUpdates] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [allGalleryImages, setAllGalleryImages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [projectId, setProjectId] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [imageEditItem, setImageEditItem] = useState(null);

  const loadStories = async () => {
    setIsLoading(true);
    try {
      setUpdates(await impactUpdateService.list({ limit: 100, project_id: projectId, status }) || []);
      setError("");
    } catch (requestError) { setError(requestError.message); } finally { setIsLoading(false); }
  };

  const loadGallery = async () => {
    setIsLoading(true);
    try {
      const [filteredImages, allImages] = await Promise.all([
        impactGalleryService.list({ project_id: projectId }),
        impactGalleryService.list(),
      ]);
      setGalleryImages(filteredImages || []);
      setAllGalleryImages(allImages || []);
      setError("");
    } catch (requestError) { setError(requestError.message); } finally { setIsLoading(false); }
  };

  useEffect(() => {
    projectService.list({ limit: 100 }).then((data) => {
      const loadedProjects = data || [];
      setProjects(loadedProjects);
      if (activeTab === "gallery") loadGallery();
    }).catch((requestError) => setError(requestError.message));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeTab === "stories") loadStories();
    else if (projects.length) loadGallery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, projectId, status]);

  useEffect(() => {
    setSearch("");
    setProjectId("");
    setStatus("");
    setShowForm(false);
    setSelectedItem(null);
    setEditItem(null);
    setImageEditItem(null);
  }, [activeTab]);

  const visibleStories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? updates.filter((item) => [item.title, item.project_title, item.description, item.support_summary].filter(Boolean).some((value) => String(value).toLowerCase().includes(query))) : updates;
  }, [search, updates]);

  const visibleImages = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? galleryImages.filter((item) => [item.caption, item.project_title].filter(Boolean).some((value) => String(value).toLowerCase().includes(query))) : galleryImages;
  }, [galleryImages, search]);

  const changeStatus = async (item, nextStatus) => { try { await impactUpdateService.updateStatus(item.id, nextStatus); await loadStories(); } catch (requestError) { setError(requestError.message); } };
  const removeStory = async (item) => { if (!window.confirm(`Delete "${item.title}"?`)) return; try { await impactUpdateService.remove(item.id); await loadStories(); } catch (requestError) { setError(requestError.message); } };
  const removeImage = async (item) => { if (!window.confirm("Delete this gallery image?")) return; try { await impactGalleryService.remove(item.id); await loadGallery(); } catch (requestError) { setError(requestError.message); } };

  const hasRecords = activeTab === "stories" ? updates.length > 0 : galleryImages.length > 0;

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="text-3xl font-extrabold text-[#07142D]">Impact Stories</h1><p className="mt-2 text-sm font-semibold text-[#687083]">Manage completed support stories and gallery photos.</p></div>{hasRecords ? <button type="button" onClick={() => setShowForm(true)} className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white"><span className="material-symbols-outlined text-[20px]">{activeTab === "stories" ? "add" : "add_photo_alternate"}</span>{activeTab === "stories" ? "Add Story" : "Upload Photos"}</button> : null}</header>

      <nav className="flex border-b border-[#DDE2EA]" aria-label="Impact story sections">
        {[{ id: "stories", label: "Completed Support", icon: "task_alt" }, { id: "gallery", label: "Gallery", icon: "photo_library" }].map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`relative inline-flex items-center gap-2 px-5 py-3 text-sm font-extrabold transition ${activeTab === tab.id ? "text-[#07142D]" : "text-[#7B8495] hover:text-[#07142D]"}`}><span className={`material-symbols-outlined text-[20px] ${activeTab === tab.id ? "text-[#D0A733]" : "text-[#9AA3B3]"}`}>{tab.icon}</span>{tab.label}{activeTab === tab.id ? <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-t bg-[#D0A733]" /> : null}</button>)}
      </nav>

      {hasRecords ? <section className="rounded-xl border border-[#E2E6EE] bg-white p-4 shadow-sm"><div className={`grid gap-3 ${activeTab === "stories" ? "lg:grid-cols-[1fr_230px_180px]" : "lg:grid-cols-[1fr_280px]"}`}><label className="relative"><span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#9AA3B3]">search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={activeTab === "stories" ? "Search stories or support cases..." : "Search photos or support cases..."} className="h-11 w-full rounded-lg border border-[#DDE2EA] pl-10 pr-4 text-sm font-semibold outline-none focus:border-[#D0A733]" /></label><select value={projectId} onChange={(event) => setProjectId(event.target.value)} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold"><option value="">All Support Cases</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select>{activeTab === "stories" ? <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-lg border border-[#DDE2EA] px-4 text-sm font-semibold"><option value="">All Status</option><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select> : null}</div></section> : null}

      {error ? <div className="rounded-lg border border-[#F2D99A] bg-[#FFF8EC] px-5 py-4 text-sm font-bold text-[#8A6400]">{error}</div> : null}

      {!isLoading && !hasRecords ? (
        <section className="flex min-h-[330px] items-center justify-center rounded-xl border border-dashed border-[#D8DEE8] bg-white px-6 py-12 text-center">
          <div className="max-w-md">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF6DE] text-[#B98C18]"><span className="material-symbols-outlined text-[28px]">{activeTab === "stories" ? "task_alt" : "photo_library"}</span></span>
            <h2 className="mt-5 text-xl font-extrabold text-[#07142D]">{activeTab === "stories" ? "No completed support stories yet" : "No gallery photos yet"}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-[#687083]">{activeTab === "stories" ? "Create the first story after a support case has been completed." : "Upload the first photos from completed support or a community activity."}</p>
            <button type="button" onClick={() => setShowForm(true)} className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#D0A733] px-5 text-sm font-extrabold text-white"><span className="material-symbols-outlined text-[20px]">{activeTab === "stories" ? "add" : "add_photo_alternate"}</span>{activeTab === "stories" ? "Create First Story" : "Upload First Photos"}</button>
          </div>
        </section>
      ) : activeTab === "stories" ? (
        <section className="overflow-hidden rounded-xl border border-[#E2E6EE] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="border-b border-[#E7EAF0] bg-[#F8FAFD] text-xs uppercase tracking-wide text-[#687083]">
                <tr>{["Story", "Support Case", "Impact", "Completion", "Status", "Actions"].map((heading) => <th key={heading} className="px-5 py-4 font-extrabold">{heading}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-[#EEF1F5]">
                {isLoading ? <tr><td colSpan="6" className="px-5 py-10 text-center font-semibold text-[#687083]">Loading completed support...</td></tr> : null}
                {!isLoading && !visibleStories.length ? <tr><td colSpan="6" className="px-5 py-10 text-center font-semibold text-[#687083]">No completed support stories found.</td></tr> : null}
                {!isLoading ? visibleStories.map((item) => (
                  <tr key={item.id} className="align-top hover:bg-[#FBFCFE]">
                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        {item.before_image_url || item.after_image_url || item.image_url ? (
                          <div className="grid h-12 w-16 shrink-0 grid-cols-2 overflow-hidden rounded-lg bg-[#EEF1F5]">
                            {[item.before_image_url || item.image_url, item.after_image_url || item.image_url].map((image, index) => image ? <img key={`${image}-${index}`} src={getAssetUrl(image)} alt="" className="h-full w-full object-cover" /> : <span key={index} className="flex items-center justify-center text-[#A86D00]"><span className="material-symbols-outlined text-[16px]">image</span></span>)}
                          </div>
                        ) : (
                          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#FFF2D9] text-[#A86D00]"><span className="material-symbols-outlined">task_alt</span></span>
                        )}
                        <div><p className="font-extrabold text-[#07142D]">{item.title}</p><p className="mt-1 max-w-[270px] line-clamp-2 text-xs font-semibold leading-5 text-[#687083]">{item.description || "No description"}</p></div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-[#536078]">{item.project_title}</td>
                    <td className="px-5 py-4"><p className="font-extrabold text-[#07142D]">{Number(item.people_helped || 0)} people</p><p className="mt-1 text-xs font-semibold text-[#687083]">{formatMoney(item.amount_delivered)}</p></td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold text-[#536078]">{item.completion_date ? new Date(item.completion_date).toLocaleDateString() : "Not set"}</td>
                    <td className="px-5 py-4"><span className={`rounded-full px-3 py-1 text-xs font-extrabold capitalize ${statusStyles[item.status] || statusStyles.draft}`}>{item.status || "draft"}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setSelectedItem({ type: "story", data: item })} title="View story" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA] text-[#536078]"><span className="material-symbols-outlined text-[19px]">visibility</span></button>
                        <button type="button" onClick={() => setEditItem(item)} title="Edit story" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA] text-[#536078]"><span className="material-symbols-outlined text-[19px]">edit</span></button>
                        <button type="button" onClick={() => setImageEditItem(item)} title="Update story images" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDE2EA] text-[#536078]"><span className="material-symbols-outlined text-[19px]">photo_camera</span></button>
                        {item.status === "draft" ? <button type="button" onClick={() => changeStatus(item, "published")} title="Publish story" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E5F6EA] text-[#2E7D42]"><span className="material-symbols-outlined text-[19px]">publish</span></button> : null}
                        <button type="button" onClick={() => removeStory(item)} title="Delete story" className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600"><span className="material-symbols-outlined text-[19px]">delete</span></button>
                      </div>
                    </td>
                  </tr>
                )) : null}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section>{isLoading ? <div className="rounded-xl border border-[#E2E6EE] bg-white px-5 py-14 text-center font-semibold text-[#687083]">Loading gallery...</div> : null}{!isLoading && visibleImages.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">{visibleImages.map((item) => <article key={item.id} className="group overflow-hidden rounded-xl border border-[#E2E6EE] bg-white shadow-sm"><button type="button" onClick={() => setSelectedItem({ type: "image", data: item })} className="relative block h-52 w-full overflow-hidden bg-[#EEF1F5]"><img src={getAssetUrl(item.image_url)} alt={item.caption || item.project_title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" /><span className="absolute inset-0 flex items-center justify-center bg-[#07142D]/0 text-white opacity-0 transition group-hover:bg-[#07142D]/35 group-hover:opacity-100"><span className="material-symbols-outlined text-[30px]">visibility</span></span></button><div className="flex items-start justify-between gap-3 p-4"><div className="min-w-0"><p className="truncate text-sm font-extrabold text-[#07142D]">{item.caption || "Gallery photo"}</p><p className="mt-1 truncate text-xs font-semibold text-[#687083]">{item.project_title}</p></div><button type="button" onClick={() => removeImage(item)} title="Delete photo" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600"><span className="material-symbols-outlined text-[19px]">delete</span></button></div></article>)}</div> : null}</section>
      )}

      {showForm && activeTab === "stories" ? <StoryForm projects={projects} onClose={() => setShowForm(false)} onSaved={loadStories} /> : null}
      {editItem ? <StoryForm projects={projects} story={editItem} onClose={() => setEditItem(null)} onSaved={loadStories} /> : null}
      {showForm && activeTab === "gallery" ? <GalleryForm projects={projects} existingImages={allGalleryImages} onClose={() => setShowForm(false)} onUploaded={loadGallery} /> : null}
      {imageEditItem ? <StoryImageForm story={imageEditItem} onClose={() => setImageEditItem(null)} onUpdated={loadStories} /> : null}
      {selectedItem ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07142D]/70 p-4" role="dialog" aria-modal="true" onMouseDown={() => setSelectedItem(null)}><article className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>{selectedItem.type === "story" && (selectedItem.data.before_image_url || selectedItem.data.after_image_url || selectedItem.data.image_url) ? <div className="grid h-64 grid-cols-2 bg-[#07142D]">{[["Before", selectedItem.data.before_image_url || selectedItem.data.image_url], ["After", selectedItem.data.after_image_url || selectedItem.data.image_url]].map(([label, image]) => <div key={label} className="relative">{image ? <img src={getAssetUrl(image)} alt={`${selectedItem.data.title || "Impact story"} ${label.toLowerCase()}`} className="h-full w-full object-cover" /> : null}<span className="absolute left-3 top-3 rounded bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase text-[#07142D]">{label}</span></div>)}</div> : selectedItem.data.image_url ? <img src={getAssetUrl(selectedItem.data.image_url)} alt={selectedItem.data.title || selectedItem.data.caption || "Impact gallery"} className={`${selectedItem.type === "image" ? "max-h-[70vh] object-contain bg-[#07142D]" : "h-64 object-cover"} w-full`} /> : null}<div className="p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-wide text-[#D0A733]">{selectedItem.data.project_title}</p><h2 className="mt-2 text-2xl font-extrabold text-[#07142D]">{selectedItem.data.title || selectedItem.data.caption || "Gallery photo"}</h2></div><button type="button" onClick={() => setSelectedItem(null)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DDE2EA]"><span className="material-symbols-outlined text-[19px]">close</span></button></div>{selectedItem.type === "story" ? <><p className="mt-5 whitespace-pre-wrap text-sm font-semibold leading-7 text-[#536078]">{selectedItem.data.description || "No description"}</p>{selectedItem.data.support_summary ? <div className="mt-5 rounded-xl bg-[#F6F8FB] p-4"><p className="text-xs font-extrabold uppercase tracking-wide text-[#8A93A3]">Support delivered</p><p className="mt-2 whitespace-pre-wrap text-sm font-semibold leading-6 text-[#536078]">{selectedItem.data.support_summary}</p></div> : null}</> : null}</div></article></div> : null}
    </div>
  );
};

export default ImpactUpdates;
