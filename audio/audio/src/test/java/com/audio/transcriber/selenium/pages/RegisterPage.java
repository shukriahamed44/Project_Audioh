package com.audio.transcriber.selenium.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class RegisterPage {
    private WebDriver driver;
    private WebDriverWait wait;

    // Multiple possible locators for registration fields
    private By usernameField = By.id("username");
    private By usernameFieldAlt = By.name("username");

    private By emailField = By.id("email");
    private By emailFieldAlt = By.name("email");

    private By passwordField = By.id("password");
    private By passwordFieldAlt = By.name("password");

    private By confirmPasswordField = By.id("confirmPassword");
    private By confirmPasswordFieldAlt = By.name("confirmPassword");

    private By registerButton = By.xpath("//button[@type='submit']");
    private By registerButtonAlt1 = By.cssSelector("button[type='submit']");

    private By loginLink = By.linkText("Login");
    private By loginLinkAlt1 = By.partialLinkText("Login");
    private By loginLinkAlt2 = By.cssSelector("a[href*='login']");

    private By successMessage = By.cssSelector(".success-message, .alert-success, .message-success");

    public RegisterPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        PageFactory.initElements(driver, this);
    }

    public void enterUsername(String username) {
        try {
            driver.findElement(usernameField).sendKeys(username);
        } catch (Exception e) {
            driver.findElement(usernameFieldAlt).sendKeys(username);
        }
    }

    public void enterEmail(String email) {
        try {
            driver.findElement(emailField).sendKeys(email);
        } catch (Exception e) {
            driver.findElement(emailFieldAlt).sendKeys(email);
        }
    }

    public void enterPassword(String password) {
        try {
            driver.findElement(passwordField).sendKeys(password);
        } catch (Exception e) {
            driver.findElement(passwordFieldAlt).sendKeys(password);
        }
    }


    public void clickRegisterButton() {
        try {
            driver.findElement(registerButton).click();
        } catch (Exception e) {
            driver.findElement(registerButtonAlt1).click();
        }
    }

    public void clickLoginLink() {
        try {
            driver.findElement(loginLink).click();
        } catch (Exception e) {
            try {
                driver.findElement(loginLinkAlt1).click();
            } catch (Exception ex) {
                driver.findElement(loginLinkAlt2).click();
            }
        }
    }

    public String getSuccessMessage() {
        try {
            return driver.findElement(successMessage).getText();
        } catch (Exception e) {
            return "";
        }
    }

    public boolean isRegistrationFormDisplayed() {
        try {
            return driver.findElement(usernameField).isDisplayed() ||
                    driver.findElement(emailField).isDisplayed();
        } catch (Exception e) {
            return false;
        }
    }
}