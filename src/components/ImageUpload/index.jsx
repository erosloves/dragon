// components/ImageUpload.js
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./index.module.css";

const ImageUpload = ({ images = [], onImagesChange }) => {
  const [draggingId, setDraggingId] = useState(null);
  const imageRefs = useRef(new Map());

  const onDrop = useCallback(
    (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        id: crypto.randomUUID(),
      }));
      if (onImagesChange) {
        onImagesChange([...images, ...newImages]);
      }
    },
    [images, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: true,
  });

  const removeImage = (idToRemove) => {
    const updatedImages = images.filter((image) => image.id !== idToRemove);
    const imageToRemove = images.find((image) => image.id === idToRemove);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    if (onImagesChange) {
      onImagesChange(updatedImages);
    }
  };

  const handleDragStart = (e, id) => {
    console.log("_dragStarted:", id);
    e.dataTransfer.setData("text/plain", id);
    const imgElement = imageRefs.current.get(id);
    if (imgElement) {
      e.dataTransfer.setDragImage(imgElement, 45, 60);
    }
    setDraggingId(id);
  };

  const handleDragOver = (e, targetId) => {
    console.log("_draggingOver:", targetId);
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (draggingId && draggingId !== targetId) {
      const newImages = [...images];
      const draggedIndex = newImages.findIndex((img) => img.id === draggingId);
      const targetIndex = newImages.findIndex((img) => img.id === targetId);

      if (
        draggedIndex !== -1 &&
        targetIndex !== -1 &&
        draggedIndex !== targetIndex
      ) {
        const [draggedItem] = newImages.splice(draggedIndex, 1);
        newImages.splice(targetIndex, 0, draggedItem);
        if (onImagesChange) {
          onImagesChange(newImages);
        }
      }
    }
  };

  const handleDrop = (e, targetId) => {
    console.log("_droppedOn:", targetId);
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId === targetId) return;

    const newImages = [...images];
    const draggedIndex = newImages.findIndex((img) => img.id === draggedId);
    const targetIndex = newImages.findIndex((img) => img.id === targetId);

    const [draggedItem] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, draggedItem);

    if (onImagesChange) {
      onImagesChange(newImages);
    }
    setDraggingId(null);
  };

  const handleDragEnd = () => {
    console.log("_dragEnded");
    setDraggingId(null);
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  return (
    <div>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${
          isDragActive ? styles.dropzoneActive : ""
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Отпустите файлы здесь...</p>
        ) : (
          <p>Перетащите изображения сюда или кликните для выбора</p>
        )}
      </div>

      <div className={styles.grid}>
        {images.map((image) => (
          <div
            key={image.id}
            className={`${styles.imageContainer} ${
              draggingId === image.id ? styles.imageContainerDragging : ""
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, image.id)}
            onDragOver={(e) => handleDragOver(e, image.id)}
            onDrop={(e) => handleDrop(e, image.id)}
            onDragEnd={handleDragEnd}
          >
            <img
              ref={(el) => {
                if (el) imageRefs.current.set(image.id, el);
                else imageRefs.current.delete(image.id);
              }}
              src={image.preview}
              className={styles.image}
              alt={`Uploaded ${image.id}`}
              draggable={false}
            />
            <button
              className={styles.removeButton}
              onClick={(e) => {
                e.stopPropagation();
                removeImage(image.id);
              }}
              title="Удалить изображение"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
