from django.contrib import admin
from django.urls import path
from sustainee.schema import schema
from django.views.decorators.csrf import csrf_exempt
from strawberry.django.views import GraphQLView


urlpatterns = [
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    path("admin/", admin.site.urls),
]