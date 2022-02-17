INSERT INTO listings (
  id,
  title,
  street_name_number,
  city,
  postal_code,
  sq_ft,
  seller_id,
  isActive,
  property_type,
  bedroom_number,
  bathroom_number,
  parking_spaces,
  photo_url,
  price
)
VALUES
(1, 'This moderately-sized House looks very old-fashioned and is in good condition.  The interior is done in colors that remind you of a coral reef.  The yard is large and looks very formal.', '66 Dante Ave', 'Victoria', '7y63j2', 1200, 3, false, 'House', 3, 3, 3, 'https://media.istockphoto.com/photos/beautiful-residential-home-exterior-on-bright-sunny-day-with-green-picture-id1211174464?k=20&m=1211174464&s=612x612&w=0&h=fQ3ahmaJnYcZb0UQtBXvOhcuhHFTgK9BA5Mylic7Gnw=', 1000000),
(2, 'This beautiful House has a quaint atmosphere and is in good condition.  The interior is done in spring colors.  The yard is moderately-sized and resembles a meadow.', '789 Java Ave', 'Victoria', '7y63j2', 2800, 4, true, 'House', 2, 4, 1, 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 400000),
(3, 'This small House almost looks extraterrestrial and is in good condition.  The interior is done in colors that remind you of the sky.  The yard is large and is neatly-trimmed.  Also, its last occupants left in a hurry.', '444 Johnson st', 'Victoria', '7y63j2', 3800, 1, true, 'House', 2, 5, 5, 'https://media.istockphoto.com/photos/brown-two-story-all-american-home-picture-id1158713117?k=20&m=1158713117&s=612x612&w=0&h=s_aoDM4KNoixI9qBLmJOBPMccoWsC11zxuBGGgFRiKY=', 800000),
(4, 'This enormous House looks very old-fashioned and is in excellent condition.  The interior is done in colors that remind you of a vampires lair.  The yard is large and looks very formal', '999 peters st', 'Calgary', '7y63j2', 4200, 1, true, 'House', 2, 5, 5, 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 900000),
(5, 'This moderately-sized House looks very old-fashioned and is in excellent condition.  The interior is done in pastel colors.  The yard is large and looks very formal.  Also, people claim to hear strange noises coming from the House at night.', '789 Castanet st', 'Kelowna', '7y63j2', 5100, 1, true, 'House', 2, 5, 5, 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 750000),
(6, 'This small House has a quaint atmosphere and is in poor condition.  The interior is done in colors that remind you of an autumn flower garden.  The yard is small and is neatly-trimmed.  Also, its last occupants left in a hurry.', '451 Little road', 'Vancouver', '7y63j2', 6000, 1, true, 'House', 2, 5, 5, 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 10),
(7, 'This large House looks a bit old-fashioned and is in good condition.  The interior is done in colors that remind you of an aspen tree.  The yard is small and is neatly-trimmed.  Also, rumor has it an old witch used to live here.', '567 Mountain st', 'SaltSpring Island', '7y63j2', 3800, 1, true, 'House', 2, 5, 5, 'https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 900000),
(8, ' This enormous House looks fairly modern and is in good condition.  The interior is done in colors that remind you of a cherry tree.  The yard is moderately-sized and is overgrown with wild plants. ', '789 Johnson St', 'Toronto', '7y63j2', 4600, 1, true, 'House', 2, 5, 5, 'https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 1200000),
(9, 'The living is easy in this impressive, generously proportioned contemporary residence with lake and ocean views, located within a level stroll to the sand and surf.', '451 Little Road', 'Vancouver', '7y63j2', 2200, 1, true, 'House', 2, 5, 4, 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 600000),
(10, 'With its warm sense of community, and only moments to shops, eateries and transport this home provides all the elements for relaxing, comfortable and easy-care living.', '798 Billups Road', 'Vancouver', '7y63j2', 8000, 1, true, 'House', 2, 3, 4, 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 600000),
(11, '
Prepare to be impressed when you enter this superbly maintained and presented home set on a sprawling 1/2 acre parcel of land occupying a peaceful street position.', '45 Harry Road', 'Vancouver', '7y63j2', 4500, 3, false, 'House', 3, 4, 2, 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 600000),
(12, 'Hidden away on the fringe of the city is this charming three bedroom residence plus study on a lush, leafy oasis.', '99 Tucker Street', 'Calgary', '7y63j2', 7500, 1, true, 'House', 2, 5, 5, 'https://images.pexels.com/photos/1612351/pexels-photo-1612351.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 1230000),
(13, 'It won’t be easy to click out of holiday mode in this stylishly contemporary residence for the modern pleasure-seeker.', '77 Connaught Drive', 'Edmonton', '7y63j2', 10000, 1, true, 'House', 2, 5, 5, 'https://images.pexels.com/photos/2183521/pexels-photo-2183521.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 975000),
(14, 'The living is easy in this impressive, generously proportioned contemporary residence with lake and ocean views, located within a level stroll to the sand and surf.', '88 Nemo Place', 'Surrey', '7y63j2', 2200, 3, true, 'House', 2, 5, 4, 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 2900000),
(15, 'With its warm sense of community, and only moments to shops, eateries and transport this home provides all the elements for relaxing, comfortable and easy-care living.', '451 Harriet Road', 'Vancouver', '7y63j2', 8000, 2, true, 'House', 3, 6, 7, 'https://images.pexels.com/photos/1022936/pexels-photo-1022936.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 5900000),
(16, 'This enormous house looks very modern and is in excellent condition.  The interior is done in bright colors.  The yard is large and resembles a meadow.', '99 Tucker Ave', 'Vancouver', '7y63j2', 12000, 1, true, 'House', 2, 5, 5, 'https://images.pexels.com/photos/242246/pexels-photo-242246.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 1000000000),
(17, 'From the outside this house looks grandiose. It has been built with oak wood and has white pine wooden decorations. Large, triangular windows allow enough light to enter the home and have been added to the house in a fairly symmetrical pattern.', '451 Kaw Place', 'Victoria', '7y63j2', 10000, 1, true, 'House', 4, 2, 3, 'https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 1205000),
(18, 'This enormous house looks very modern and is in excellent condition.  The interior is done in bright colors.  The yard is large and resembles a meadow.', '99 Tucker Ave', 'Vancouver', '7y63j2', 12000, 1, true, 'House', 2, 5, 5, 'https://images.pexels.com/photos/242246/pexels-photo-242246.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 8000000);
