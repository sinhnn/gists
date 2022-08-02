`<UserControl
    x:Class="${context.namespace}.CollapsibleSearchBox"
    x:Name="Root"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:local="using:${context.namespace}"
    xmlns:muxc="using:Microsoft.UI.Xaml.Controls"
    xmlns:animatedvisuals="using:Microsoft.UI.Xaml.Controls.AnimatedVisuals"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    d:DesignHeight="32"
    d:DesignWidth="240"
    mc:Ignorable="d">

    <Grid>
        <ToggleButton
            x:Name="SearchButton"
            Width="32"
            Height="32"
            Padding="6"
            HorizontalAlignment="Right"
            VerticalAlignment="Top"
            Checked="SearchButton_Checked"
            Visibility="Collapsed"
            muxc:AnimatedIcon.State="Normal"
            PointerEntered="ToggleButton_PointerEntered"
            PointerExited="ToggleButton_PointerExited">
            <Grid>
                <FontIcon
                    x:Name="FilteredIcon"
                    FontSize="16"
                    Glyph="&#xE16E;"
                    Visibility="Collapsed"
                    Foreground="{ThemeResource SystemAccentColor}"/>
                <muxc:AnimatedIcon
                    x:Name="DefaultIcon">
                    <animatedvisuals:AnimatedFindVisualSource/>
                    <!-- FallbackIconSource uses FontIconSource because the FontSize needs to be
                         set to a size that fits into the same space allowed for the animated icon. -->
                    <muxc:AnimatedIcon.FallbackIconSource>
                        <muxc:FontIconSource
                            FontSize="16"
                            Glyph="&#xE11A;"/>
                    </muxc:AnimatedIcon.FallbackIconSource>
                </muxc:AnimatedIcon>
            </Grid>
        </ToggleButton>

        <AutoSuggestBox
            x:Name="SearchBox"
            LostFocus="SearchBox_LostFocus"
            HorizontalAlignment="Stretch"
            PlaceholderText="Search..."
            Visibility="Visible"
            TextChanged="SearchBox_TextChanged">
            <AutoSuggestBox.QueryIcon>
                <muxc:AnimatedIcon>
                    <animatedvisuals:AnimatedFindVisualSource/>
                    <muxc:AnimatedIcon.FallbackIconSource>
                        <muxc:FontIconSource
                            FontSize="16"
                            Glyph="&#xE11A;"/>
                    </muxc:AnimatedIcon.FallbackIconSource>
                </muxc:AnimatedIcon>
            </AutoSuggestBox.QueryIcon>
        </AutoSuggestBox>
        <VisualStateManager.VisualStateGroups>
            <VisualStateGroup>
                <VisualState x:Name="OpenState">
                    <VisualState.Setters>
                        <Setter Target="Root.Width" Value="240"/>
                    </VisualState.Setters>
                </VisualState>
                <VisualState x:Name="CollapsedState">
                    <VisualState.Setters>
                        <Setter Target="SearchBox.Visibility" Value="Collapsed"/>
                        <Setter Target="SearchButton.Visibility" Value="Visible"/>
                        <Setter Target="Root.Width" Value="32"/>
                    </VisualState.Setters>
                </VisualState>
            </VisualStateGroup>
            <VisualStateGroup>
                <VisualState x:Name="NonFilteredState"/>
                <VisualState x:Name="FilteredState">
                    <VisualState.Setters>
                        <Setter Target="DefaultIcon.Visibility" Value="Collapsed"/>
                        <Setter Target="FilteredIcon.Visibility" Value="Visible"/>
                    </VisualState.Setters>
                </VisualState>
            </VisualStateGroup>
        </VisualStateManager.VisualStateGroups>
    </Grid>
</UserControl>
`