const _ = require('lodash');

const slugify = text => _.kebabCase(text);

async function createUniqueSlug(Model, slug, count) {
  const user = await Model.findOne({ slug: `${slug}-${count}` }, 'id');

  if (!user) {
    return `${slug}-${count}`;
  }

  return createUniqueSlug(Model, slug, count + 1);
}

async function generateSlug(Model, name, filter = {}) {
  /**
   * Turn name into a slug format via slugify
   */
  const origSlug = slugify(name);

  /**
   * Check if the user slug already exist
   */
  const user = await Model.findOne(Object.assign({ slug: origSlug }, filter), 'id');

  /**
   * If the slug doesn't exist, return the new slug
   */
  if (!user) {
    return origSlug;
  }

  /**
   * If the same slug does exist, add a number on the end of the slug and return new slug
   */
  return createUniqueSlug(Model, origSlug, 1);
}

module.exports = generateSlug;
