import React, { useState } from "react";
import { Plus, Trash2, ChevronLeft, ChevronRight, Download } from "lucide-react";
import toast from "react-hot-toast";

function PPTEditor() {
  const [slides, setSlides] = useState([
    { id: 1, title: "Welcome to Presentation", content: "Click to edit" }
  ]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const addSlide = () => {
    const newSlide = {
      id: Date.now(),
      title: `Slide ${slides.length + 1}`,
      content: "Click to edit content"
    };
    setSlides([...slides, newSlide]);
    setCurrentSlide(slides.length);
    toast.success("New slide added!");
  };

  const deleteSlide = (index) => {
    if (slides.length === 1) {
      toast.error("Cannot delete the last slide!");
      return;
    }
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    if (currentSlide >= newSlides.length) {
      setCurrentSlide(newSlides.length - 1);
    }
    toast.success("Slide deleted!");
  };

  const updateSlide = (field, value) => {
    const newSlides = [...slides];
    newSlides[currentSlide][field] = value;
    setSlides(newSlides);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const downloadPresentation = () => {
    const dataStr = JSON.stringify(slides, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "presentation.json";
    link.click();
    toast.success("Presentation downloaded!");
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">📊 Presentation Editor</h1>
          <button
            onClick={downloadPresentation}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
          >
            <Download size={20} />
            Download
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Slide Thumbnails Sidebar */}
          <div className="lg:col-span-1 bg-gray-800/50 rounded-xl p-4 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Slides</h2>
            <div className="space-y-2">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    currentSlide === index
                      ? "bg-purple-600 border-2 border-purple-400"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <p className="font-semibold text-sm truncate">{slide.title}</p>
                  <p className="text-xs text-gray-300">Slide {index + 1}</p>
                </div>
              ))}
            </div>

            {/* Add Slide Button */}
            <button
              onClick={addSlide}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
            >
              <Plus size={20} />
              Add Slide
            </button>
          </div>

          {/* Main Editor Area */}
          <div className="lg:col-span-3">
            {/* Slide Preview */}
            <div className="bg-white text-black rounded-xl p-12 min-h-96 mb-6 shadow-2xl">
              <h1 className="text-5xl font-bold mb-6 border-b-4 border-purple-600 pb-4">
                {currentSlideData.title}
              </h1>
              <p className="text-2xl whitespace-pre-wrap leading-relaxed">
                {currentSlideData.content}
              </p>
            </div>

            {/* Editing Fields */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Slide Title</label>
                <input
                  type="text"
                  value={currentSlideData.title}
                  onChange={(e) => updateSlide("title", e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter slide title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Slide Content</label>
                <textarea
                  value={currentSlideData.content}
                  onChange={(e) => updateSlide("content", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
                  placeholder="Enter slide content"
                />
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              <div className="text-center">
                <p className="text-lg font-semibold">
                  Slide {currentSlide + 1} of {slides.length}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={nextSlide}
                  disabled={currentSlide === slides.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded-lg transition"
                >
                  Next
                  <ChevronRight size={20} />
                </button>

                <button
                  onClick={() => deleteSlide(currentSlide)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                >
                  <Trash2 size={20} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PPTEditor;