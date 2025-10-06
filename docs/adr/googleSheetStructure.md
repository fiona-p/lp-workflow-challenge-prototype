# Google Sheet structure

| module_id | module_type | block_order | image_desktop                                                            | image_mobile                                                             | alt_text             | headline      | subheading     | cta_label | cta_url | cta_style | overlay_content_align | design_change_needed | figma_design |
| --------- | ----------- | ----------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | -------------------- | ------------- | -------------- | --------- | ------- | --------- | --------------------- | -------------------- | ------------ |
| hero_1    | hero        | 1           | https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1200      | https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800       | Woman in autumn coat | New Season    | Shop Men       | Shop Now  | /       | primary   | left                  | FALSE                |              |
| promo_1   | promo       | 1           | https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=400 | https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=400 | Kids wearing coats   | Womens' Coats | from £20       | Buy Now   | /       | secondary | right                 | FALSE                |              |
| promo_1   | promo       | 2           | https://images.unsplash.com/photo-1616150840617-a0124ea42a1f?q=80&w=687  | https://images.unsplash.com/photo-1616150840617-a0124ea42a1f?q=80&w=687  | Dining room setup    | Home Trends   | New collection | Explore   | /       | primary   | centre                | TRUE                 |              |
| hero_2    | hero        | 1           | https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?w=1200      | https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?w=1200      | Man in jacket        | Winter Styles | Shop Men       | Explore   | /       | secondary |                       | FALSE                |              |
| promo_2   | promo       | 1           | https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=400 | https://plus.unsplash.com/premium_photo-1675186049366-64a655f8f537?w=400 |                      |               |                |           |         |           |                       |                      |              |
| promo_2   | promo       | 2           | https://images.unsplash.com/photo-1616150840617-a0124ea42a1f?q=80&w=687  | https://images.unsplash.com/photo-1616150840617-a0124ea42a1f?q=80&w=687  |                      |               |                |           |         |           |                       |                      |              |

## Google Sheet Structure Explained

The Google Sheet represents the content structure of the webpage by breaking it down into **Modules** and **Blocks**.

- **Module** = a **section** on the page  
  Examples:

  - Hero Banner
  - Promo Section
  - Featured Products

- **Block** = one **piece inside that section**  
  Examples:
  - Each promo item inside a promo section
  - Each product card
  - Each image + CTA combination inside a Hero module

---

### How it is represented in the Google Sheet

| Column                  | Description                                                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `module_id`             | Identifies which module (page section) the block belongs to. Multiple rows can share the same `module_id`, grouping blocks under the same module. |
| `module_type`           | The type of module (e.g. hero, promo)                                                                                                             |
| `block_order`           | The order of the block inside the module (controls rendering sequence)                                                                            |
| `image_desktop`         | URL of the desktop version of the image                                                                                                           |
| `image_mobile`          | URL of the mobile version of the image                                                                                                            |
| `alt_text`              | Alternative text for the image (for accessibility)                                                                                                |
| `headline`              | The main heading text for the block                                                                                                               |
| `subheading`            | The secondary heading or description                                                                                                              |
| `cta_label`             | The label for the Call To Action button                                                                                                           |
| `cta_url`               | The URL linked to the Call To Action                                                                                                              |
| `cta_style`             | Styling info for the CTA button (e.g., primary, secondary)                                                                                        |
| `overlay_content_align` | Optional alignment setting for the overlay content. Can be `left`, `right`, or `centre`. Empty means default alignment (left)                     |
| `design_change_needed`  | Flag indicating if design updates are needed (`TRUE` / `FALSE`)                                                                                   |
| `figma_design`          | Optional link or identifier to a Figma design for this block                                                                                      |

---

### Spreadsheet analogy:

- **Each row** in the sheet represents **one block** inside a module.
- **Each column** represents a specific **property** or **field** of that block (e.g., headline, image URL, CTA label).
- Multiple blocks within the same module share the same `module_id` to group them logically.
- The `block_order` determines the order blocks appear within the module on the page.

---

**Considerations for Future Extension and Scalability**

- Each site will have its own Google Sheet to manage content independently.

- A page column must be added to define which page a module belongs to.

  Alternatively, separate tabs (sheets) within the same Google Sheet could represent different pages.

Adding pages introduces additional complexity. For this prototype, multi-page or multi-tab support was intentionally left out due to time constraints and scope.
