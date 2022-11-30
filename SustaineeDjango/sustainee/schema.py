# schema.py
import typing
import strawberry
from strawberry.file_uploads import Upload
from PIL import Image
from rembg import remove
from pathlib import Path
from .types import Background
from SustaineeDjango.settings import BASE_DIR
from io import BytesIO
import base64
from .stickerinator.stickerinator import stickerinator
from .u2net.u2net_engine import remove_bg as u2net

@strawberry.input
class FolderInput:
    files: typing.List[Upload]

@strawberry.type
class Query:
    @strawberry.field
    def hello() -> str:
        return "world"

@strawberry.type
class Mutation:
    @strawberry.mutation
    def Stickerinator(self, file: Upload) -> Background:
        print(file)
        fileName = str(file).split('.')[:1]
        output_path = f'{BASE_DIR}/static/media/{fileName[0]}.png'

        #img.show()

        #input = Image.open(file)
        #output = remove(input)
        #output.save(output_path)
        output = stickerinator(file)

        bytesIO = BytesIO()
        output.save(bytesIO, format="png")
        im_bytes = bytesIO.getvalue()
        output = base64.b64encode(im_bytes)
        output = output.decode("utf-8")
             
        #return Background(imageFile=f"http://127.0.0.1:8000/static/media/{fileName[0]}.png")
        return Background(name=str(file), imageFile=output)

    @strawberry.mutation
    def U2net(self, file: Upload) -> Background:
        print(file)
        fileName = str(file).split('.')[:1]
        output_path = f'{BASE_DIR}/static/media/{fileName[0]}.png'

        #img.show()

        input = Image.open(file)
        output = remove(input)
        #output.save(output_path)
        #output = u2net(file)

        bytesIO = BytesIO()
        output.save(bytesIO, format="png")
        im_bytes = bytesIO.getvalue()
        output = base64.b64encode(im_bytes)
        output = output.decode("utf-8")
             
        #return Background(imageFile=f"http://127.0.0.1:8000/static/media/{fileName[0]}.png")
        return Background(name=str(file), imageFile=output)

    @strawberry.mutation
    def read_files(self, files: typing.List[Upload]) -> typing.List[str]:
        contents = []
        for file in files:
            content = file.read().decode()
            contents.append(content)
        return contents
 
    @strawberry.mutation
    def read_folder(self, folder: FolderInput) -> typing.List[str]:
        contents = []
        for file in folder.files:
            contents.append(file.read().decode())
        return contents

schema = strawberry.Schema(query=Query, mutation=Mutation)