import { test, expect } from "@playwright/test";

test.describe("Cat Gallery", () => {
  test("should navigate to cats gallery and interact with cat details", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/cats-gallery");

    await expect(page).toHaveURL(/.*cats-gallery/);

    await page.getByRole("link", { name: /cat #/i }).first().click();

    await expect(
      page.getByRole("button", { name: "Favourite cat" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Favourite cat" }).click();

    await expect(
      page.getByRole("button", { name: "Unfavourite cat" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Unfavourite cat" }).click();

    await expect(
      page.getByRole("button", { name: "Favourite cat" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Close modal" }).click();

    await expect(
      page.getByRole("button", { name: "Close modal" })
    ).not.toBeVisible();
  });
});

test.describe("Cat Breeds", () => {
  test("should navigate to breeds and view breed details", async ({ page }) => {
    await page.goto("http://localhost:3000/cats-gallery");

    await page.getByRole("link", { name: "Cat Breeds" }).click();

    await expect(page).toHaveURL(/.*breeds/);

    await page.getByRole("link", { name: "Abyssinian Egypt" }).click();

    await page.locator(".relative.w-full.h-48").first().click();

    await expect(page.getByText("Weight:3 - 5kg")).toBeVisible();
    await expect(page.getByText("Child Friendly:")).toBeVisible();
    await expect(page.getByText("Health Issues:")).toBeVisible();
    await expect(page.getByText("Energy Level:")).toBeVisible();
    await expect(page.getByText("Intelligence:")).toBeVisible();
  });

  test("should navigate between cats-gallery and breeds and favorite a cat", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/cats-gallery");

    await page.getByRole("link", { name: "Cat Breeds" }).click();

    await expect(page).toHaveURL(/.*breeds/);

    await page.getByRole("link", { name: "Abyssinian" }).click();

    await expect(
      page.getByRole("heading", { name: "Abyssinian" })
    ).toBeVisible();

    await page
      .locator(
        ".grid.grid-cols-1.sm\\:grid-cols-2.md\\:grid-cols-3.gap-neo-lg.justify-items-center > a:nth-child(2)"
      )
      .click();

    await expect(
      page.getByRole("button", { name: "Favourite cat" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Favourite cat" }).click();

    await expect(
      page.getByRole("button", { name: "Unfavourite cat" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Close modal" }).click();

    await expect(
      page.getByRole("button", { name: "Close modal" })
    ).not.toBeVisible();
  });
});

test.describe("Favourites", () => {
  test("should manage favourites and navigate back to gallery", async ({
    page,
  }) => {
    await page.goto("http://localhost:3000/cats-gallery");
    await page.getByRole("link", { name: /cat #/i }).first().click();

    await expect(
      page.getByRole("button", { name: "Favourite cat" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Favourite cat" }).click();
    await page.getByRole("button", { name: "Close modal" }).click();

    await page.getByRole("link", { name: "Favourites" }).click();

    await expect(page).toHaveURL(/.*favourites/);

    await page.waitForSelector('button[aria-label="Unfavourite cat"]', {
      state: "visible",
    });

    await page.getByRole("button", { name: "Unfavourite cat" }).click();

    await expect(
      page.getByRole("button", { name: "Browse Cats" })
    ).toBeVisible();

    await page.getByRole("button", { name: "Browse Cats" }).click();

    await expect(page).toHaveURL(/.*cats-gallery/);
  });
});
