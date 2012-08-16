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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120816013931) do

  create_table "pledges", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "stripe_id"
    t.string   "email"
    t.string   "phone"
    t.decimal  "amount",          :precision => 4, :scale => 2
    t.string   "school",                                        :default => "General Pledge"
    t.text     "instructions"
    t.string   "billing_address"
    t.string   "billing_city"
    t.integer  "state_id"
    t.string   "billing_zip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "states", :force => true do |t|
    t.string   "full_name"
    t.string   "abbreviation"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
