const mongoose = require('mongoose');
const slugify = require('slugify');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        name: { type: String, required: true },
        discription: { type: String },
        videoId: { type: String },
        image: { type: String },
        level: { type: String },
        slug: { type: String, unique: true },
    },
    {
        timestamps: true,
    },
);

// 🧠 Tạo slug unique trước khi lưu
CourseSchema.pre('save', async function (next) {
    if (!this.name) return next();

    let baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    if (this.isNew || this.isModified('name')) {
        const Course = mongoose.model('Course');
        while (await Course.exists({ slug })) {
            slug = `${baseSlug}-${counter++}`;
        }
        this.slug = slug;
    }

    next();
});

// ⚙️ Kích hoạt plugin xóa mềm
CourseSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Course', CourseSchema);
