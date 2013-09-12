class CreatePlacemarks < ActiveRecord::Migration
  def change
    create_table :placemarks do |t|
      t.title
      t.description
      t.timestart
      t.timeend
      t.pointx
      t.pointy
      t.pointz

      t.timestamps
    end
  end
end
