const ImagePreview = ({ url, heading }) => {
  return (
    <div>
      {url && (
        <div>
          <h1 className="right-heading">{heading}</h1>
          <div className="preivew-image">
            <img src={url} className="w-[200px] h-full object-cover" alt="" />
          </div>
        </div>
      )}
    </div>
  );
};
export default ImagePreview;
