# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150911234311) do

  create_table "banners", force: :cascade do |t|
    t.string  "name"
    t.string  "image"
    t.string  "descriptor"
    t.boolean "to_category_sidebar", default: false
  end

  add_index "banners", ["descriptor"], name: "index_banners_on_descriptor"
  add_index "banners", ["image"], name: "index_banners_on_image"
  add_index "banners", ["name"], name: "index_banners_on_name"
  add_index "banners", ["to_category_sidebar"], name: "index_banners_on_to_category_sidebar"

  create_table "carts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "line_items", force: :cascade do |t|
    t.integer  "product_id"
    t.integer  "cart_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "quantity",   default: 1
    t.integer  "order_id"
  end

  add_index "line_items", ["cart_id"], name: "index_line_items_on_cart_id"
  add_index "line_items", ["order_id"], name: "index_line_items_on_order_id"
  add_index "line_items", ["product_id"], name: "index_line_items_on_product_id"

  create_table "menu_items", force: :cascade do |t|
    t.integer "menu_id"
    t.integer "menu_item_id"
    t.string  "name"
    t.string  "descriptor"
    t.string  "link"
    t.integer "position"
  end

  add_index "menu_items", ["descriptor"], name: "index_menu_items_on_descriptor"
  add_index "menu_items", ["link"], name: "index_menu_items_on_link"
  add_index "menu_items", ["menu_id"], name: "index_menu_items_on_menu_id"
  add_index "menu_items", ["menu_item_id"], name: "index_menu_items_on_menu_item_id"
  add_index "menu_items", ["name"], name: "index_menu_items_on_name"
  add_index "menu_items", ["position"], name: "index_menu_items_on_position"

  create_table "menus", force: :cascade do |t|
    t.string "name"
    t.string "descriptor"
  end

  add_index "menus", ["descriptor"], name: "index_menus_on_descriptor"
  add_index "menus", ["name"], name: "index_menus_on_name"

  create_table "mini_carts", force: :cascade do |t|
    t.integer  "product_id"
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.string   "address"
    t.integer  "count"
    t.boolean  "agree_newsletter", default: true
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "mini_carts", ["address"], name: "index_mini_carts_on_address"
  add_index "mini_carts", ["agree_newsletter"], name: "index_mini_carts_on_agree_newsletter"
  add_index "mini_carts", ["count"], name: "index_mini_carts_on_count"
  add_index "mini_carts", ["email"], name: "index_mini_carts_on_email"
  add_index "mini_carts", ["name"], name: "index_mini_carts_on_name"
  add_index "mini_carts", ["phone"], name: "index_mini_carts_on_phone"
  add_index "mini_carts", ["product_id"], name: "index_mini_carts_on_product_id"

  create_table "orders", force: :cascade do |t|
    t.string   "name"
    t.text     "address"
    t.string   "email"
    t.string   "pay_type"
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
    t.string   "surname"
    t.string   "skype"
    t.string   "phone"
    t.string   "adress"
    t.text     "additional_info"
    t.string   "responcse_status", default: "data_processing"
    t.boolean  "viewed_seller",    default: false
  end

  create_table "post_categories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "seo_title"
    t.string   "seo_description"
    t.string   "seo_keywords"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "post_categories", ["description"], name: "index_post_categories_on_description"
  add_index "post_categories", ["name"], name: "index_post_categories_on_name"
  add_index "post_categories", ["seo_description"], name: "index_post_categories_on_seo_description"
  add_index "post_categories", ["seo_keywords"], name: "index_post_categories_on_seo_keywords"
  add_index "post_categories", ["seo_title"], name: "index_post_categories_on_seo_title"

  create_table "posts", force: :cascade do |t|
    t.integer  "post_category_id"
    t.string   "name"
    t.text     "content"
    t.text     "lead"
    t.boolean  "to_main_page",     default: false
    t.string   "avatar"
    t.string   "seo_title"
    t.string   "seo_description"
    t.string   "seo_keywords"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
  end

  add_index "posts", ["avatar"], name: "index_posts_on_avatar"
  add_index "posts", ["content"], name: "index_posts_on_content"
  add_index "posts", ["lead"], name: "index_posts_on_lead"
  add_index "posts", ["name"], name: "index_posts_on_name"
  add_index "posts", ["post_category_id"], name: "index_posts_on_post_category_id"
  add_index "posts", ["seo_description"], name: "index_posts_on_seo_description"
  add_index "posts", ["seo_keywords"], name: "index_posts_on_seo_keywords"
  add_index "posts", ["seo_title"], name: "index_posts_on_seo_title"
  add_index "posts", ["to_main_page"], name: "index_posts_on_to_main_page"

  create_table "product_attacments", force: :cascade do |t|
    t.integer  "product_id"
    t.string   "image"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "product_attacments", ["image"], name: "index_product_attacments_on_image"
  add_index "product_attacments", ["product_id"], name: "index_product_attacments_on_product_id"

  create_table "product_categories", force: :cascade do |t|
    t.string   "name"
    t.text     "description"
    t.string   "avatar"
    t.string   "to_main_page"
    t.datetime "created_at",                                                 null: false
    t.datetime "updated_at",                                                 null: false
    t.integer  "product_category_id"
    t.string   "seo_title"
    t.string   "seo_description"
    t.string   "seo_keywords"
    t.boolean  "to_main_page_product_categories_list",       default: false
    t.integer  "to_main_page_product_categories_list_order", default: 1
    t.boolean  "to_category_sidebar"
  end

  add_index "product_categories", ["avatar"], name: "index_product_categories_on_avatar"
  add_index "product_categories", ["description"], name: "index_product_categories_on_description"
  add_index "product_categories", ["name"], name: "index_product_categories_on_name"
  add_index "product_categories", ["to_main_page"], name: "index_product_categories_on_to_main_page"

  create_table "product_category_attacments", force: :cascade do |t|
    t.integer  "product_category_id"
    t.string   "image"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  add_index "product_category_attacments", ["image"], name: "index_product_category_attacments_on_image"
  add_index "product_category_attacments", ["product_category_id"], name: "index_product_category_attacments_on_product_category_id"

  create_table "product_tags", force: :cascade do |t|
    t.integer "product_id"
    t.integer "tag_id"
  end

  add_index "product_tags", ["product_id"], name: "index_product_tags_on_product_id"
  add_index "product_tags", ["tag_id"], name: "index_product_tags_on_tag_id"

# Could not dump table "products" because of following NoMethodError
#   undefined method `[]' for nil:NilClass

  create_table "sellers", force: :cascade do |t|
    t.string   "name"
    t.string   "surname"
    t.string   "email"
    t.string   "skype"
    t.string   "phone"
    t.string   "zip"
    t.string   "sity"
    t.string   "avatar"
    t.string   "status"
    t.text     "info"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "sellers", ["avatar"], name: "index_sellers_on_avatar"
  add_index "sellers", ["email"], name: "index_sellers_on_email"
  add_index "sellers", ["info"], name: "index_sellers_on_info"
  add_index "sellers", ["name"], name: "index_sellers_on_name"
  add_index "sellers", ["phone"], name: "index_sellers_on_phone"
  add_index "sellers", ["sity"], name: "index_sellers_on_sity"
  add_index "sellers", ["skype"], name: "index_sellers_on_skype"
  add_index "sellers", ["status"], name: "index_sellers_on_status"
  add_index "sellers", ["surname"], name: "index_sellers_on_surname"
  add_index "sellers", ["zip"], name: "index_sellers_on_zip"

  create_table "site_variables", force: :cascade do |t|
    t.integer "static_page_id"
    t.string  "name"
    t.text    "content"
    t.string  "descriptor"
  end

  add_index "site_variables", ["content"], name: "index_site_variables_on_content"
  add_index "site_variables", ["descriptor"], name: "index_site_variables_on_descriptor"
  add_index "site_variables", ["name"], name: "index_site_variables_on_name"
  add_index "site_variables", ["static_page_id"], name: "index_site_variables_on_static_page_id"

  create_table "sliders", force: :cascade do |t|
    t.string   "name"
    t.string   "descriptor"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "sliders", ["descriptor"], name: "index_sliders_on_descriptor"
  add_index "sliders", ["name"], name: "index_sliders_on_name"

  create_table "slides", force: :cascade do |t|
    t.integer  "slider_id"
    t.string   "title"
    t.string   "image"
    t.string   "descriptor"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "slides", ["descriptor"], name: "index_slides_on_descriptor"
  add_index "slides", ["image"], name: "index_slides_on_image"
  add_index "slides", ["slider_id"], name: "index_slides_on_slider_id"
  add_index "slides", ["title"], name: "index_slides_on_title"

  create_table "static_pages", force: :cascade do |t|
    t.string "name"
    t.text   "content"
    t.string "descriptor"
  end

  add_index "static_pages", ["content"], name: "index_static_pages_on_content"
  add_index "static_pages", ["descriptor"], name: "index_static_pages_on_descriptor"
  add_index "static_pages", ["name"], name: "index_static_pages_on_name"

  create_table "tags", force: :cascade do |t|
    t.string "title"
    t.string "slug"
  end

  add_index "tags", ["slug"], name: "index_tags_on_slug"
  add_index "tags", ["title"], name: "index_tags_on_title"

end
