import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test("Should allow user to register", async ({ page }) => {
    const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@test.com`;
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Become A Host" }).click();
    await page.getByRole("link", { name: "Don't have an account? Sign In Here" }).click();

    await page.locator("[name=firstName]").fill("test_firstName");
    await page.locator("[name=lastName]").fill("test_lastName");
    await page.locator("[name=email]").fill(testEmail);
    await page.locator("[name=password]").fill("123456");
    await page.locator("[name=confirmPassword]").fill("123456");
    
    await page.setInputFiles('[name="profileImage"]', [
        path.join(__dirname, "files", "1.png"),
    ])

    await page.getByRole("button", { name: "REGISTER" }).click();
    await expect(page.getByText("Register successfully")).toBeVisible();
})

test("Should user to sign in", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByRole("link", { name: "Become A Host" }).click();

    await page.locator("[name=email]").fill("test@test.com");
    await page.locator("[name=password]").fill("123456");

    await page.getByRole("button", { name: "LOGIN" }).click();
    await expect(page.getByText("Login successfully")).toBeVisible();


})