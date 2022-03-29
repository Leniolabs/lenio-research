const DownloadButton = ({ children, objectToDownload, fileName }) => {
  const download = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:application/octet-stream," +
        encodeURIComponent(JSON.stringify(objectToDownload, null, 2))
    );
    element.setAttribute("download", fileName);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  return (
    <button className="btn download-btn" onClick={download}>
      {children}
    </button>
  );
};
export default DownloadButton;
