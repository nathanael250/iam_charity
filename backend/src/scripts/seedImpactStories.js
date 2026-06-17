require("../config/env");

const fs = require("fs");
const path = require("path");
const { pool, query } = require("../config/database");
const { impactStoryUploadsDir } = require("../config/paths");

const assetRoot = path.resolve(__dirname, "../../../frontend/src/assets");

const stories = [
  {
    project: {
      title: "Safe Home",
      slug: "safe-home-impact-story",
      category: "housing",
      location: "Kigali, Kabuga",
    },
    update: {
      title: "The Mukamana Family Has a Safe Home",
      description: "The family moved from a temporary shelter into a safe home with room to live and grow.",
      support_summary: "A safe home was completed for the family, giving them stable shelter and dignity.",
      people_helped: 5,
      amount_delivered: 0,
      completion_date: "2026-06-17",
      status: "published",
    },
    beforeAsset: "imact stories/before.png",
    afterAsset: "imact stories/after.png",
    beforeName: "seed-mukamana-before.png",
    afterName: "seed-mukamana-after.png",
  },
  {
    project: {
      title: "Family Support",
      slug: "family-support-impact-story",
      category: "daily_needs",
      location: "Rulindo, Cyinzuzi",
    },
    update: {
      title: "A More Secure Life for Nyiransabimana",
      description: "Practical support helped Nyiransabimana create a safer and more stable life for her children.",
      support_summary: "Family support was delivered through practical care and follow-up visits.",
      people_helped: 4,
      amount_delivered: 0,
      completion_date: "2026-06-17",
      status: "published",
    },
    beforeAsset: "family_images/c_img1.png",
    afterAsset: "family_images/c_img3.png",
    beforeName: "seed-nyiransabimana-before.png",
    afterName: "seed-nyiransabimana-after.png",
  },
  {
    project: {
      title: "Education Support",
      slug: "education-support-impact-story",
      category: "education",
      location: "Gicumbi District",
    },
    update: {
      title: "Children Received Learning Materials",
      description: "Children received the materials they needed to return to class and continue learning.",
      support_summary: "Learning materials were delivered so children could continue their education.",
      people_helped: 120,
      amount_delivered: 0,
      completion_date: "2026-06-17",
      status: "published",
    },
    beforeAsset: "family_images/c_img6.png",
    afterAsset: "family_images/c_img6.png",
    beforeName: "seed-education-before.png",
    afterName: "seed-education-after.png",
  },
];

const copyAsset = (relativeSource, fileName) => {
  fs.mkdirSync(impactStoryUploadsDir, { recursive: true });
  const source = path.join(assetRoot, relativeSource);
  const destination = path.join(impactStoryUploadsDir, fileName);
  if (!fs.existsSync(destination)) fs.copyFileSync(source, destination);
  return `/uploads/impact-stories/${fileName}`;
};

const findOrCreateProject = async ({ title, slug, category, location }) => {
  const existing = await query("SELECT id FROM projects WHERE slug = ? LIMIT 1", [slug]);
  if (existing.length) return existing[0].id;

  const result = await query(
    `INSERT INTO projects
      (title, slug, short_description, full_description, category, location, target_amount,
       raised_amount, main_image, status, start_date, end_date, created_by)
     VALUES (?, ?, ?, ?, ?, ?, 0, 0, NULL, 'completed', NULL, NULL, NULL)`,
    [title, slug, `${title} completed support story`, `${title} completed support story`, category, location]
  );
  return result.insertId;
};

const seed = async () => {
  for (const story of stories) {
    const projectId = await findOrCreateProject(story.project);
    const beforeImageUrl = copyAsset(story.beforeAsset, story.beforeName);
    const afterImageUrl = copyAsset(story.afterAsset, story.afterName);
    const existing = await query("SELECT id, before_image_url, after_image_url FROM project_updates WHERE title = ? LIMIT 1", [story.update.title]);

    if (existing.length) {
      await query(
        `UPDATE project_updates
         SET project_id = ?, description = ?, support_summary = ?, amount_delivered = ?,
             people_helped = ?, completion_date = ?, status = ?,
             before_image_url = COALESCE(NULLIF(before_image_url, ''), ?),
             after_image_url = COALESCE(NULLIF(after_image_url, ''), ?)
         WHERE id = ?`,
        [
          projectId,
          story.update.description,
          story.update.support_summary,
          story.update.amount_delivered,
          story.update.people_helped,
          story.update.completion_date,
          story.update.status,
          beforeImageUrl,
          afterImageUrl,
          existing[0].id,
        ]
      );
      continue;
    }

    await query(
      `INSERT INTO project_updates
        (project_id, title, description, support_summary, amount_delivered, people_helped,
         completion_date, status, created_by, published_at, image_url, before_image_url, after_image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL, NOW(), NULL, ?, ?)`,
      [
        projectId,
        story.update.title,
        story.update.description,
        story.update.support_summary,
        story.update.amount_delivered,
        story.update.people_helped,
        story.update.completion_date,
        story.update.status,
        beforeImageUrl,
        afterImageUrl,
      ]
    );
  }

  console.log("Frontend impact stories are seeded in the database");
};

seed()
  .catch((error) => {
    console.error("Failed to seed impact stories:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => pool.end());
