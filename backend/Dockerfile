FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY src/BelaBarriga.Api/BelaBarriga.Api.csproj src/BelaBarriga.Api/
RUN dotnet restore src/BelaBarriga.Api/BelaBarriga.Api.csproj
COPY . .
RUN dotnet publish src/BelaBarriga.Api/BelaBarriga.Api.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
EXPOSE 8080
ENTRYPOINT ["dotnet", "BelaBarriga.Api.dll"]
