import React from "react";
import Dropzone from "react-dropzone";
import classNames from "classnames";

const DropZone = props => {
  return (
    <div>
      <Dropzone onDrop={props.onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div
              {...getRootProps()}
              className={classNames("dropzone", {
                "dropzone--isActive": isDragActive
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop files here...</p>
              ) : (
                <p>{props.description}</p>
              )}
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
};

export default DropZone;
