﻿fsCustom.writeFileSync(generatedFileConfig.outFilePath,
`
<Page
    x:Class="Contoso.App.AppShell"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:uc="using:Contoso.App.UserControls"
    xmlns:muxc="using:Microsoft.UI.Xaml.Controls"
    KeyDown="AppShell_KeyDown"
    TabNavigation="Cycle"
    mc:Ignorable="d">
    <Page.Resources>
        <!--This top margin is the height of the custom TitleBar-->
        <Thickness x:Key="NavigationViewContentMargin">0,48,0,0</Thickness>
    </Page.Resources>
    <Grid
        x:Name="LayoutRoot">
        <Border x:Name="AppTitleBar"
                IsHitTestVisible="True"
                VerticalAlignment="Top"
                HorizontalAlignment="Stretch"
                Background="Transparent"
                Height="48"
                Width="auto"
                Canvas.ZIndex="1" 
                Margin="48,0,120,0">
            <StackPanel Orientation="Horizontal" HorizontalAlignment="Stretch">
                <Border Background="{ThemeResource SystemAccentColor}" 
                        HorizontalAlignment="Left" 
                        Width="20" Height="20" >
                    <Image Source="Assets/Square44x44Logo.png"/>
                </Border>
                <TextBlock x:Name="AppTitle"
                    VerticalAlignment="Center"
                    Margin="12,0,0,0"
                    Style="{StaticResource CaptionTextBlockStyle}" />
            </StackPanel>
        </Border>
        
        <muxc:NavigationView
            x:Name="NavView"
            AlwaysShowHeader="False"
            IsSettingsVisible="True"
            ItemInvoked="NavigationView_ItemInvoked"
            BackRequested="NavigationView_BackRequested"
            IsBackEnabled="{x:Bind AppFrame.CanGoBack, Mode=OneWay}"
            IsTitleBarAutoPaddingEnabled="False">

            <muxc:NavigationView.MenuItems>
            ${tables.map(table => `
                <muxc:NavigationViewItem
                    x:Name="${table.modelName}ListMenuItem"
                    Content="{x:Bind ${table.modelName}ListLabel}" 
                    ToolTipService.ToolTip="{x:Bind ${table.modelName}ListLabel}"
                    Icon="ContactInfo"/>
            `).join("")}
            </muxc:NavigationView.MenuItems>

            <muxc:NavigationView.PaneFooter>
                <StackPanel>
                    <muxc:NavigationViewItem
                        Content="View code"
                        ToolTipService.ToolTip="View code"
                        Tapped="ViewCodeNavPaneButton_Tapped">
                        <muxc:NavigationViewItem.Icon>
                            <FontIcon Glyph="&#xE943;"/>
                        </muxc:NavigationViewItem.Icon>
                    </muxc:NavigationViewItem>
                    <!--<uc:AuthenticationControl/>-->
                </StackPanel>
            </muxc:NavigationView.PaneFooter>

            <!-- In OnNavigatingToPage, we synchronize the selected item in the NavigationView with the current page. -->
            <Frame
                x:Name="frame"
                Margin="20,0,0,0"
                Navigating="OnNavigatingToPage">
                <Frame.ContentTransitions>
                    <TransitionCollection>
                        <NavigationThemeTransition>
                            <NavigationThemeTransition.DefaultNavigationTransitionInfo>
                                <EntranceNavigationTransitionInfo />
                            </NavigationThemeTransition.DefaultNavigationTransitionInfo>
                        </NavigationThemeTransition>
                    </TransitionCollection>
                </Frame.ContentTransitions>
            </Frame>
        </muxc:NavigationView>
        
        <VisualStateManager.VisualStateGroups>
            <VisualStateGroup>
                <VisualState>
                    <VisualState.StateTriggers>
                        <AdaptiveTrigger MinWindowWidth="{StaticResource LargeWindowSnapPoint}" />
                    </VisualState.StateTriggers>
                </VisualState>
                <VisualState>
                    <VisualState.StateTriggers>
                        <AdaptiveTrigger MinWindowWidth="{StaticResource MediumWindowSnapPoint}" />
                    </VisualState.StateTriggers>
                </VisualState>
                <VisualState>
                    <VisualState.StateTriggers>
                        <AdaptiveTrigger MinWindowWidth="{StaticResource MinWindowSnapPoint}" />
                    </VisualState.StateTriggers>
                    <VisualState.Setters>
                        <Setter Target="AppTitleBar.Margin" Value="88,0,0,0"/>
                    </VisualState.Setters>
                </VisualState>
            </VisualStateGroup>
        </VisualStateManager.VisualStateGroups>
    </Grid>
</Page>
`);