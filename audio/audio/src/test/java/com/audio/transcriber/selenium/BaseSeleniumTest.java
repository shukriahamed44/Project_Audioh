package com.audio.transcriber.selenium;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class BaseSeleniumTest {
    protected WebDriver driver;
    protected WebDriverWait wait;

    public void setUp() {
        WebDriverManager.chromedriver().setup();

        ChromeOptions options = new ChromeOptions();

        // CRITICAL: Add these for GitHub Actions CI environment
        options.addArguments("--headless"); // Run without GUI
        options.addArguments("--no-sandbox"); // Required for CI
        options.addArguments("--disable-dev-shm-usage"); // Prevent memory issues
        options.addArguments("--remote-allow-origins=*"); // Fix session creation error
        options.addArguments("--user-data-dir=/tmp/chrome-user-data-" + System.currentTimeMillis()); // Unique directory

        options.addArguments("--disable-blink-features=AutomationControlled");
        options.setExperimentalOption("excludeSwitches", new String[]{"enable-automation"});
        options.setExperimentalOption("useAutomationExtension", false);

        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(5));
    }

    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}