# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
user = User.create! :username => 'tom', :email => 'thomas@thomashastings.com', :password => 'changeme', :password_confirmation => 'changeme'
9.times do |i|
  Post.create(
    title: "Post #{i + 1}",
    content: '227g tub clotted cream, 25g butter, 1 tsp cornflour,100g parmesan, grated nutmeg, 
    250g fresh fettuccine or tagliatelle, snipped chives or chopped parsley to serve (optional)',
    author: 'Tom'
  )
end