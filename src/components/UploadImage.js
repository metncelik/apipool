// import { uploadFile } from "../database/storage";
// import { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";

// const UploadImage = ({setDownloadUrl}) => {
//     const [uploadedFile, setUploadedFile] = useState(null);
//     const fileDataAsBytes = [];

//     const onDrop = useCallback((acceptedFiles) => {
//         setUploadedFile(acceptedFiles[0]);
//     }, []);

//     const { getRootProps, getInputProps } = useDropzone({
//         onDrop,
//         accept: 'image/*',
//         multiple: false,
//     });

//     const handleUpload = () => {
//         try {
//             if (uploadedFile) {
//                 const reader = new FileReader();
//                 reader.onload = () => {
//                     const bytes = new Uint8Array(reader.result);
//                     fileDataAsBytes.push(bytes);
//                     console.log('File as bytes:', bytes);
//                     const downloadUrl = uploadFile("model_images/image.jpg", bytes)
//                     setDownloadUrl(downloadUrl)
//                 };
//                 reader.readAsArrayBuffer(uploadedFile);

//             };
//         } catch (error) {
//             alert(error)
//         }
//     }

//     return (
//         <div>
//             <div {...getRootProps()}>
//                 <input {...getInputProps()} />
//                 <p>Drag &amp; drop an image file here, or click to select one.</p>
//             </div>
//             {
//                 uploadedFile && (
//                     <div>
//                         <p>File: {uploadedFile.name}</p>
//                         <button onClick={handleUpload}>Upload</button>
//                     </div>
//                 )
//             }
//         </div>
//     );
// }

// export default UploadImage;