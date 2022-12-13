import { createContext, ReactNode, useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { base64StringToBlob } from "blob-util";
import pWaitFor from "p-wait-for";
import { saveAs } from "file-saver";

interface typeContext {
  gliderState?: any;
  glider?: any;
  onStartButton?: any;
  StartBoolean?: any;
  selectedImages?: any;
  setSelectedImages?: any;
  onSelectFile?: any;
  handleSize?: any;
  SaveImages?: any;
  setSelectedFilesArray?: any;
  selectedFilesArray?: any;
  dragStyle?: any;
  onDrag?: any;
  onDrop?: any;
  onDragLeave?: any;
}
const Context = createContext<typeContext>({});
export default Context;

function MUTATION(gliderState: any) {
  var MUTATION: any;
  if (gliderState === "0") {
    MUTATION = `
          mutation ($file: Upload!) {
            U2net(file: $file) {
              name
              imageFile
            }
          }
        `;
  }

  if (gliderState === "1") {
    MUTATION = `
          mutation ($file: Upload!) {
            Stickerinator(file: $file) {
              name
              imageFile
            }
          }
        `;
  }
  MUTATION = gql`
    ${MUTATION}
  `;
  return MUTATION;
}

const contentType = "image/png";
var blob;
var name: any;
function ResponseData(data: any, Model: any, setSelectedImages: any) {
  blob = base64StringToBlob(data.imageFile, contentType);
  name = data.name;
  const blobImage = URL.createObjectURL(blob);
  setSelectedImages((current: any) =>
    current.map((obj: any) => {
      if (obj.Imagename === name && Model === "U2net") {
        return { ...obj, U2net: blobImage };
      }
      if (obj.Imagename === name && Model === "Stickerinator") {
        return { ...obj, Stickerinator: blobImage };
      }
      return obj;
    })
  );
}

interface File {
  name: string;
  lastModified: number;
  webkitRelativePath: string;
  size: number;
  type: string;
}

interface ImagesOBJ {
  Imagename?: string;
  originalImage: string;
  U2net?: string;
  Stickerinator?: string;
}

var waitForMutate: Boolean = true;
//var selectedFilesArray: File[] = [];
var waitForRes: number = 1;
var startTriggered: Boolean = false;

interface Props {
  children?: ReactNode;
}

interface dragFilestype {
  state?: any;
  Files?: any;
}

export const WorkingAppProvider = ({ children }: Props) => {
  const [selectedImages, setSelectedImages] = useState(Array<ImagesOBJ>);
  const [selectedFilesArray, setSelectedFilesArray] = useState<File[]>([]);
  const [gliderState, setGlider] = useState("0");
  const [StartBoolean, setStartBoolean] = useState(false);
  const [dragStyle, setDragStyle] = useState<{ border?: any }>({});
  const [mutate, { loading, error, data: mutateResponse }] = useMutation(
    MUTATION(gliderState),
    {
      onCompleted(data) {
        if (gliderState === "0") {
          ResponseData(data.U2net, "U2net", setSelectedImages);
        } else {
          ResponseData(data.Stickerinator, "Stickerinator", setSelectedImages);
        }
        waitForMutate = true;
        waitForRes = waitForRes + 1;
      },
    }
  );

  const handleSize = (event: any) => {};

  function ManupulateFiles(Files: any) {
    console.log("ManupulateFiles");
    var selectedFiles: File[] = Array.from(Files);
    for (const File of selectedFiles) {
      if (File.size > 1024000) {
        console.log(File.size);
        selectedFiles = [];
        alert(
          `"${File.name}" is larger than 1 Mb. Please, add image less than 1MB.`
        );
      }
    }
    if (selectedFiles.length > 5) {
      selectedFiles = [];
      alert(`You can only add 5 Images at a time.`);
    }
    setSelectedFilesArray(selectedFilesArray.concat(selectedFiles));
    //selectedFilesArray = selectedFilesArray.concat(selectedFiles);

    const imagesArray: Array<ImagesOBJ> = selectedFiles.map((image: any) => {
      return {
        Imagename: image.name,
        originalImage: URL.createObjectURL(image),
      };
    });

    selectedFiles = [];
    setSelectedImages(selectedImages.concat(imagesArray));
  }

  const onSelectFile = async (event: any) => {
    ManupulateFiles(event.target.files);
  };

  let onDrag = (event: any) => {
    event.preventDefault();
    if (dragStyle.border === "1px solid #ea2d49") {
      {
      }
    } else {
      setDragStyle({ border: "1px solid #ea2d49" });
    }
  };

  let onDragLeave = () => {
    setDragStyle({ border: "1px solid rgba(0, 0, 0, 0.19)" });
  };

  let onDrop = (event: any) => {
    event.preventDefault();
    setDragStyle({ border: "1px solid rgba(0, 0, 0, 0.19)" });
    ManupulateFiles(event.dataTransfer.files);
  };

  async function StartButton(
    selectedImages: any,
    gliderState: any,
    mutate: any
  ) {
    startTriggered = true;
    var zero = 0;
    var one = 0;
    for (let i = 0; i < selectedImages.length; i++) {
      if (typeof selectedImages[i].U2net === "undefined") {
        zero = zero + 1;
      }
      if (typeof selectedImages[i].Stickerinator === "undefined") {
        one = one + 1;
      }
      //console.log("zero", zero, "one", one);
    }

    try {
      for (let i = 0; i < selectedFilesArray.length; i++) {
        //console.log("selectedImages Unet", selectedImages[i], selectedImages);
        if (
          gliderState === "0" &&
          typeof selectedImages[i].U2net === "undefined"
        ) {
          if (waitForRes >= selectedFilesArray.length + 1) {
            waitForRes = selectedFilesArray.length - zero;
            waitForRes = waitForRes + 1;
            //console.log("At zero waitForRes", waitForRes);
          }
          await pWaitFor(() => waitForMutate == true);
          var file = selectedFilesArray[i];

          mutate({ variables: { file } });
          waitForMutate = false;
          if (i == selectedFilesArray.length - 1) {
            await pWaitFor(() => waitForRes == selectedFilesArray.length + 1);
          }
        }

        if (
          gliderState === "1" &&
          typeof selectedImages[i].Stickerinator === "undefined"
        ) {
          if (waitForRes >= selectedFilesArray.length + 1) {
            waitForRes = selectedFilesArray.length - one;
            waitForRes = waitForRes + 1;
            //console.log("At one waitForRes", waitForRes);
          }
          await pWaitFor(() => waitForMutate == true);
          var file = selectedFilesArray[i];

          mutate({ variables: { file } });
          waitForMutate = false;
          if (i == selectedFilesArray.length - 1) {
            await pWaitFor(() => waitForRes == selectedFilesArray.length + 1);
          }
        }
      }
    } catch (err) {
      alert(err);
    }
  }

  const onStartButton = () => {
    setStartBoolean(true);

    if (startTriggered === true) {
      alert("Please wait for ongoing process.");
    } else {
      StartButton(selectedImages, gliderState, mutate).then(function () {
        setStartBoolean(false);
        startTriggered = false;
        //console.log("I'm excecuted", StartBoolean);
      });
    }
  };

  const glider = (e: any) => {
    setGlider(e.currentTarget.id);
  };

  let SaveImages = async () => {
    var Object: any;
    for (const object of selectedImages) {
      if (gliderState === "0") {
        Object = object.U2net;
      } else {
        Object = object.Stickerinator;
      }
      if (typeof Object !== "undefined") {
        console.log(Object, `${object.Imagename?.split(".")[0]}.png`);
        saveAs(`${Object}`, `${object.Imagename?.split(".")[0]}.png`);
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
  };

  let contextData = {
    gliderState: gliderState,
    glider: glider,
    onStartButton: onStartButton,
    StartBoolean: StartBoolean,
    selectedImages: selectedImages,
    setSelectedImages: setSelectedImages,
    onSelectFile: onSelectFile,
    handleSize: handleSize,
    SaveImages: SaveImages,
    setSelectedFilesArray: setSelectedFilesArray,
    selectedFilesArray: selectedFilesArray,
    dragStyle: dragStyle,
    onDrag: onDrag,
    onDrop: onDrop,
    onDragLeave: onDragLeave,
  };

  return <Context.Provider value={contextData}>{children}</Context.Provider>;
};
