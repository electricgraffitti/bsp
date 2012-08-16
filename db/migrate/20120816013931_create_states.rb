class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :full_name
      t.string :abbreviation
      t.timestamps
    end
  end
end