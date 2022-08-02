`
<ContentDialog
    x:Class="${context.namespace}.SaveChangesDialog"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:local="using:${context.namespace}"
    Title="Save changes?"
    Content="You have unsaved changes that will be lost. Would you like to save your changes?"
    PrimaryButtonText="Save"
    SecondaryButtonText="Don't save"
    CloseButtonText="Cancel"
    PrimaryButtonClick="ContentDialog_PrimaryButtonClick"
    SecondaryButtonClick="ContentDialog_SecondaryButtonClick"
    CloseButtonClick="ContentDialog_CloseButtonClick"
    mc:Ignorable="d">
    <ContentDialog.Resources>
        <Style TargetType="local:SaveChangesDialog" BasedOn="{StaticResource DefaultContentDialogStyle}"/>
    </ContentDialog.Resources>
</ContentDialog>
`