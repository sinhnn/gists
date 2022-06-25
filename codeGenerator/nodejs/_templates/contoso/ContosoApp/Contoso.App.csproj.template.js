fsCustom.writeFileSync(generatedFileConfig.outFilePath,
`
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net6.0-windows10.0.22000.0</TargetFramework>
    <TargetPlatformMinVersion>10.0.19041.0</TargetPlatformMinVersion>
    <RootNamespace>Contoso.App</RootNamespace>
    <ApplicationManifest>app.manifest</ApplicationManifest>
    <Platforms>x86;x64;arm64</Platforms>
    <RuntimeIdentifiers>win10-x86;win10-x64;win10-arm64</RuntimeIdentifiers>
    <PublishProfile>win10-$(Platform).pubxml</PublishProfile>
    <UseWinUI>true</UseWinUI>
    <EnablePreviewMsixTooling>true</EnablePreviewMsixTooling>
    <SupportedOSPlatformVersion>10.0.22000.0</SupportedOSPlatformVersion>
    <GenerateAppInstallerFile>False</GenerateAppInstallerFile>
    <AppxAutoIncrementPackageRevision>True</AppxAutoIncrementPackageRevision>
    <AppxSymbolPackageEnabled>False</AppxSymbolPackageEnabled>
    <GenerateTestArtifacts>True</GenerateTestArtifacts>
    <AppxBundle>Never</AppxBundle>
    <HoursBetweenUpdateChecks>0</HoursBetweenUpdateChecks>
    <UseWindowsForms>False</UseWindowsForms>
  </PropertyGroup>

  <ItemGroup>
    <Content Include="Assets\\SplashScreen.scale-200.png" />
    <Content Include="Assets\\LockScreenLogo.scale-200.png" />
    <Content Include="Assets\\Square150x150Logo.scale-200.png" />
    <Content Include="Assets\\Square44x44Logo.scale-200.png" />
    <Content Include="Assets\\Square44x44Logo.targetsize-24_altform-unplated.png" />
    <Content Include="Assets\\StoreLogo.png" />
    <Content Include="Assets\\Wide310x150Logo.scale-200.png" />
  </ItemGroup>

  <ItemGroup>
    <PackageReference Include="CommunityToolkit.WinUI" Version="7.1.2" />
    <PackageReference Include="CommunityToolkit.WinUI.UI.Controls" Version="7.1.2" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Sqlite" Version="6.0.4" />
    <PackageReference Include="Microsoft.Graph" Version="4.25.0" />
    <PackageReference Include="Microsoft.Identity.Client.Extensions.Msal" Version="2.20.1" />
    <PackageReference Include="Microsoft.WindowsAppSDK" Version="1.0.0" />
    <PackageReference Include="Microsoft.Windows.SDK.BuildTools" Version="10.0.22000.194" />
    <Manifest Include="$(ApplicationManifest)" />
  </ItemGroup>

  <!-- Defining the "Msix" ProjectCapability here allows the Single-project MSIX Packaging
       Tools extension to be activated for this project even if the Windows App SDK Nuget
       package has not yet been restored -->
  <ItemGroup Condition="'$(DisableMsixProjectCapabilityAddedByProject)'!='true' and '$(EnablePreviewMsixTooling)'=='true'">
    <ProjectCapability Include="Msix" />
  </ItemGroup>
  <ItemGroup>
    <ProjectReference Include="..\\ContosoModels\\Contoso.Models.csproj" />
    <ProjectReference Include="..\\ContosoRepository\\Contoso.Repository.csproj" />
  </ItemGroup>
  <!-- <ItemGroup>
    <Compile Update="Settings.Designer.cs">
      <DesignTimeSharedInput>True</DesignTimeSharedInput>
      <AutoGen>True</AutoGen>
      <DependentUpon>Settings.settings</DependentUpon>
    </Compile>
  </ItemGroup>
  <ItemGroup>
    <None Update="Settings.settings">
      <Generator>SettingsSingleFileGenerator</Generator>
      <LastGenOutput>Settings.Designer.cs</LastGenOutput>
    </None>
  </ItemGroup> -->
  <ItemGroup>
    <Page Update="AppShell.xaml">
      <SubType>Designer</SubType>
    </Page>
    <Page Update="MainWindow.xaml">
      <XamlRuntime>$(DefaultXamlRuntime)</XamlRuntime>
    </Page>
    <Page Update="UserControls\\CollapsibleSearchBox.xaml">
      <SubType>Designer</SubType>
    </Page>

    ${tables.map(table => `
    <Page Update="Views\\${table.modelName}ListPage.xaml">
      <SubType>Designer</SubType>
    </Page>`
    ).join("")}

    <Page Update="Views\\SaveChangesDialog.xaml">
      <SubType>Designer</SubType>
    </Page>
    <Page Update="Views\\SettingsPage.xaml">
      <SubType>Designer</SubType>
    </Page>
  </ItemGroup>
  <!-- <ItemGroup>
    <Service Include="{508349b6-6b84-4df5-91f0-309beebad82d}" />
  </ItemGroup> -->
</Project>
`);