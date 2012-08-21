class CreatePledges < ActiveRecord::Migration
  def change
    create_table :pledges do |t|
      t.string :first_name
      t.string :last_name
      t.string :stripe_id
      t.string :email
      t.string :phone
      t.decimal :amount, precision: 8, scale: 2
      t.string :school, default: "General Pledge"
      t.text :instructions
      t.string :billing_address
      t.string :billing_city
      t.integer :state_id
      t.string :billing_zip

      t.timestamps
    end
  end
end
