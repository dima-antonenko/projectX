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

ActiveRecord::Schema.define(version: 20150801131108) do

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
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.integer  "product_category_id"
    t.string   "seo_title"
    t.string   "seo_description"
    t.string   "seo_keywords"
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

end
