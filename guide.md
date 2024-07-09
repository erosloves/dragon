## Сначала нужно создать `состояние, которое равно пустому объекту`, для получения файлов из формы

`const [files, setFiles] = useState({});`

## А так же для url `состояние, которое равно пустому массиву`,для отображения превью

`const [previewUrls, setPreviewUrls] = useState([]);`

## Затем к событию `onChange` для `input` создать обработчик:

<input
        multiple
        onChange={handleFilesChange}
        type="file"
        ref={uploadImages}
    />

const handleFilesChange = (e) => {
const mergedObj = mergeObjectsWithNumericKeys(e.target.files, files);
setFiles(mergedObj);
};

## Вспомогательная функция для объединения объектов изображений из формы в новый объект для отправки на сервер

const mergeObjectsWithNumericKeys = (obj1, obj2) => {
const merged = {};

    const addToMerged = (obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        if (merged[key] !== undefined) {
          let uniqueKey = parseInt(key, 10);
          while (merged[uniqueKey] !== undefined) {
            uniqueKey++;
          }
          merged[uniqueKey] = value;
        } else {
          merged[key] = value;
        }
      });
    };

    addToMerged(obj1);
    addToMerged(obj2);

    return merged;

};

## Затем состояние `prewievUrls` обновить с помощью хука `useEffect`

useEffect(() => {
if (files.length === 0) return;
const selectedPrewievUrls = Object.values(files).map((file) => {
return URL.createObjectURL(file);
});
setPreviewUrls(selectedPrewievUrls);
}, [files]);

## И отрендерить компонет в `JSX` разметке

{previewUrls.length > 0 && (
<div className={style.imageswrapper}>
{previewUrls.map((url, index) => (
<div className={style.imageswrapper__item} key={index}>
<img src={url} alt={index} />
</div>
))}
</div>
)}
