from PIL import Image
from rembg import remove
from pathlib import Path
from SustaineeDjango.settings import BASE_DIR
from io import BytesIO
import base64
from .stickerinator.stickerinator import stickerinator
from .u2net.u2net_engine import remove_bg as u2net
import ddddsr
import cv2
import os
from .Types import Background,Upscaler, SignUp, SignUpInput, SignUpPartialInput, SignUpFilter
from strawberry_django import mutations
import strawberry
from strawberry.file_uploads import Upload
from typing import List, Union
from gqlauth.core.directives import TokenRequired
from gqlauth.core.field_ import field
from gqlauth.core.types_ import GQLAuthError
from gqlauth.user import arg_mutations
from gqlauth.user.queries import UserQueries
from gqlauth.user.resolvers import Captcha



@strawberry.type
class MyAuthorizedQueries(UserQueries):
    @strawberry.field
    def secured_string(self) -> str:
        return "Good day"


@strawberry.type
class Query:
    @field(directives=[TokenRequired()])
    def auth_entry(self) -> Union[GQLAuthError, MyAuthorizedQueries]:
        return MyAuthorizedQueries()

    SignUps: List[SignUp] = strawberry.django.field()


@strawberry.type
class AuthMutation:
    verify_token = arg_mutations.VerifyToken.field
    update_account = arg_mutations.UpdateAccount.field
    archive_account = arg_mutations.ArchiveAccount.field
    delete_account = arg_mutations.DeleteAccount.field
    password_change = arg_mutations.PasswordChange.field


@strawberry.type
class Mutation:
    @field(directives=[TokenRequired()])
    def auth_entry(self) -> Union[GQLAuthError, AuthMutation]:
        return AuthMutation()

    captcha = Captcha.field
    token_auth = arg_mutations.ObtainJSONWebToken.field
    register = arg_mutations.Register.field
    verify_account = arg_mutations.VerifyAccount.field
    resend_activation_email = arg_mutations.ResendActivationEmail.field
    send_password_reset_email = arg_mutations.SendPasswordResetEmail.field
    password_reset = arg_mutations.PasswordReset.field
    password_set = arg_mutations.PasswordSet.field
    refresh_token = arg_mutations.RefreshToken.field
    revoke_token = arg_mutations.RevokeToken.field


    createFruits: List[SignUp] = mutations.create(SignUpInput)
    updateFruits: List[SignUp] = mutations.update(SignUpPartialInput, filters=SignUpFilter)
    deleteFruits: List[SignUp] = mutations.delete(filters=SignUpFilter)

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
    def Upscaler(self, file: Upload, model: str, scale: float) -> Upscaler:
        print(file, model, scale)
        output_path = f'{BASE_DIR}/static/media/{str(file)}'
        input = Image.open(file)
        input.save(output_path)
        sr = ddddsr.SR(
            # models: currently supports ['waifu2x_art', 'waifu2x_photo']
            model = model, 
            # scale
            scale = scale, 
            # denoise level: range in [-1, 3], -1 means no denoising.
            denoise_level =  2,
        )(output_path)
        os.remove(output_path)

        sr = cv2.cvtColor(sr, cv2.COLOR_BGR2RGB)
        output = Image.fromarray(sr.astype('uint8'), 'RGB')

        bytesIO = BytesIO()
        output.save(bytesIO, format="png")
        im_bytes = bytesIO.getvalue()
        output = base64.b64encode(im_bytes)
        output = output.decode("utf-8")
             
        return Upscaler(name=str(file), imageFile=output)


schema = strawberry.Schema(
    query=Query,
    mutation=Mutation,
)