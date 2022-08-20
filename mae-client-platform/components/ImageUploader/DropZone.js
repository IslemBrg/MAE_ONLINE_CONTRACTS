import React, { useState, useEffect } from "react";
import Image from "next/image";
import FilePreview from "./FilePreview";
import styles from "../../styles/DropZone.module.css";

const DropZone = ({ data, dispatch, file, onFileChange }) => {
  
  
  
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add selected file or files to fileList 
      if(data.fileList.length > 0){
        data.fileList = []
        dispatch({ type: "ADD_FILE_TO_LIST", files });
      }else{
        dispatch({ type: "ADD_FILE_TO_LIST", files });
      }
        
    }
  };

  // to handle file uploads
  const uploadFiles = async () => {
    // get the files from the fileList as an array
    let files = data.fileList[0];

    // send the file to the parent page
    onFileChange([files]);
    
  };

  return (
    <>
      <div
        className={styles.dropzone}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <Image src="/upload.svg" alt="upload" height={50} width={50} />

        <input
          id="fileSelect"
          type="file"
          accept="image/*"
          className={styles.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect">Select Image</label>

        <h3 className={styles.uploadMessage}>
          or drag &amp; drop your Image here
        </h3>
      </div>
      {/* Pass the selectect or dropped files as props */}
      <FilePreview fileData={data} />
      {/* Only show upload button after selecting atleast 1 file */}
      {data.fileList.length > 0 && (
        <button className={styles.uploadBtn} onClick={uploadFiles}>
          Upload
        </button>
      )}
    </>
  );
};

export default DropZone;
