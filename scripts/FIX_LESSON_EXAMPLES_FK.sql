-- Fix lesson_examples foreign key to reference lessons table

-- Step 1: Drop old foreign key constraint
ALTER TABLE lesson_examples DROP CONSTRAINT IF EXISTS examples_lesson_id_fkey;

-- Step 2: Update all lesson_ids
UPDATE lesson_examples SET lesson_id = '667d146c-bca2-4c29-800a-40b1fb577bca' WHERE lesson_id = '51ebd0e3-730b-4306-be9f-fa34d26caf00'; -- science-introduction
UPDATE lesson_examples SET lesson_id = '2f7ab93c-af8f-408c-9c2a-f7114b57002b' WHERE lesson_id = '891dc3d9-7888-44b0-ac1d-10f4b6e817ff'; -- cannot-be-determined
UPDATE lesson_examples SET lesson_id = '9b8da732-182a-44c5-b3d2-3a95d8718fbb' WHERE lesson_id = 'ae2aadb4-8e26-41b2-9b5c-28f772bef856'; -- inverse-trends-multiple-axes
UPDATE lesson_examples SET lesson_id = '42594785-0153-49f9-bedf-b2daf9bb837a' WHERE lesson_id = 'e40c7087-b1e5-45bd-b985-8cacea9f1dc8'; -- passage-approach
UPDATE lesson_examples SET lesson_id = '9292b9a2-0e17-433a-adb5-c49f39a3e018' WHERE lesson_id = 'd69f1305-3696-41da-9cbb-0bd686510f26'; -- mixing
UPDATE lesson_examples SET lesson_id = '0b4b783a-9945-47b9-b3fc-e194374d6818' WHERE lesson_id = '161abec9-9c0a-461f-8093-bbdb6ed57a06'; -- 2.5
UPDATE lesson_examples SET lesson_id = 'f3f83683-e489-40f6-8651-33ae565aeffd' WHERE lesson_id = 'c0cec396-68cb-4971-b72e-ed0d9f63810e'; -- answer-choices
UPDATE lesson_examples SET lesson_id = '25fb92b6-429e-4940-802a-e339ae3a47e1' WHERE lesson_id = 'a0c25645-cb8f-4ff8-a128-d0015997cd2d'; -- question-types
UPDATE lesson_examples SET lesson_id = '680d39ef-6fc8-490b-a574-c68fad112466' WHERE lesson_id = 'e3821f5f-0ef6-4af5-831f-e465442f47af'; -- comparing-passages
UPDATE lesson_examples SET lesson_id = 'a88d6452-a9bc-45d2-bb84-3e483ce948c6' WHERE lesson_id = 'cd6d42c2-7bef-4c05-9437-6b233ddcc382'; -- maximizing-score
UPDATE lesson_examples SET lesson_id = '406a197f-f7d0-4c0d-9582-594dbb1bd8a0' WHERE lesson_id = '9f52026c-45b1-47af-94ef-c0f3b7767131'; -- practice-passages
UPDATE lesson_examples SET lesson_id = '7a364f5c-98c3-4c74-a115-159dd6c64cf0' WHERE lesson_id = 'c879b92b-6647-484b-908c-17723c60e735'; -- breaking-down-questions
UPDATE lesson_examples SET lesson_id = '22c56dfe-b819-42f2-a601-54d0ea5f2707' WHERE lesson_id = '1c9d0b31-c6bd-4eb7-85e5-564883010651'; -- question-diagnosis
UPDATE lesson_examples SET lesson_id = '53c5676d-0fa7-4416-8848-38268483599e' WHERE lesson_id = '434fee00-3ab1-4859-93a3-1c9f832c7cd1'; -- specific-data-point
UPDATE lesson_examples SET lesson_id = 'b8825e84-e3de-4642-913e-fc5c1ea70690' WHERE lesson_id = 'd260fe02-d1be-4e06-9399-d5dc451ff648'; -- trends
UPDATE lesson_examples SET lesson_id = '5a176fd8-0715-406c-95af-f4a532789b9f' WHERE lesson_id = 'd7bfd0d9-e595-4732-a221-61f765cd95a4'; -- core-principles
UPDATE lesson_examples SET lesson_id = '8a05747a-31df-4a21-822f-3cc6d7739416' WHERE lesson_id = '0c2ed2d8-25ee-42aa-8e86-4f0cf63cd574'; -- multiple-figures
UPDATE lesson_examples SET lesson_id = '8d819556-9a8d-4cf0-9d8e-a42c4d6442cf' WHERE lesson_id = 'd9d47255-408d-4d9c-be03-21f5fc7b04a9'; -- figures-text
UPDATE lesson_examples SET lesson_id = 'eb0ae215-47e8-4b48-8251-250067974600' WHERE lesson_id = 'b53e21d6-fd47-49d6-8eca-5e968696d9e9'; -- two-part-answers
UPDATE lesson_examples SET lesson_id = '69db2ad0-40cb-4e75-8a57-b62673b41694' WHERE lesson_id = 'd67c9343-7ec2-471e-aff6-c2f7dc9aa8cb'; -- math-on-science
UPDATE lesson_examples SET lesson_id = '189a5ffc-6e86-4c9a-9569-63b81c991635' WHERE lesson_id = 'e8cbc4a5-73f1-4011-972d-93d45a6b4261'; -- correct-vs-incorrect
UPDATE lesson_examples SET lesson_id = 'a30dfe02-47a0-4c7c-86a6-b5dde55a467a' WHERE lesson_id = 'a8f28944-5f6a-4be5-af38-1165f3f36e2e'; -- scatter-plots
UPDATE lesson_examples SET lesson_id = 'ac4440f6-f391-4a04-9a5c-751a2e0ca5b7' WHERE lesson_id = '888338a2-169e-4dff-948f-c7b186edd0fd'; -- finding-correct-answer
UPDATE lesson_examples SET lesson_id = '3dd67429-a421-4449-86be-4f622d21e7ce' WHERE lesson_id = '492939b0-c63f-4a19-ae0c-dd775a78011f'; -- water-knowledge
UPDATE lesson_examples SET lesson_id = '1513e653-31c1-418d-9e7f-f91253d9438b' WHERE lesson_id = '2c0a1aae-3715-4eae-9995-6ce49813c31a'; -- experimental-setup
UPDATE lesson_examples SET lesson_id = '413af8b0-2287-4863-a1b2-9ada2ed01ebd' WHERE lesson_id = '2907c34f-5163-43b2-aa7b-c20036331a80'; -- pacing-time-management
UPDATE lesson_examples SET lesson_id = '3e8f0696-1bf7-4b5c-880d-fb5359923b7d' WHERE lesson_id = '33292648-8367-4957-9ccf-6f2dfc182141'; -- commas
UPDATE lesson_examples SET lesson_id = '10fff941-59e1-4d3a-84b7-d0fe8f9985ef' WHERE lesson_id = 'd1281768-ce7e-47f7-aa84-f4533d41c416'; -- verbs
UPDATE lesson_examples SET lesson_id = '3c3585a1-f137-4331-8390-29ef1f5e889f' WHERE lesson_id = 'f7aadb91-0ce8-4e09-b7bb-5909d4481e6b'; -- pronouns
UPDATE lesson_examples SET lesson_id = 'f7ac1d6c-6416-47fd-9720-807224100517' WHERE lesson_id = 'e57a463a-2257-4a89-966f-ad34b9a4b102'; -- modifiers
UPDATE lesson_examples SET lesson_id = 'e6153221-e330-4db4-8cc7-9c5a1d51a301' WHERE lesson_id = '09a41283-2118-41cb-8d51-bd161b67c16d'; -- parallel-structure
UPDATE lesson_examples SET lesson_id = '4a9e06f8-5ee5-4e5d-9e5d-2ce9b7c6bf16' WHERE lesson_id = '1ab3ef29-b3fb-43b2-a5f5-964a7c8422ce'; -- misc-topics
UPDATE lesson_examples SET lesson_id = 'a2e663e5-60b8-402a-ab1f-1d1bf2d93336' WHERE lesson_id = '1b265e10-62cb-4361-be0d-52de6b0d63f8'; -- grammar-review
UPDATE lesson_examples SET lesson_id = '04df2a09-a910-4456-8fe5-2f8e7f62c50f' WHERE lesson_id = 'a3029ba0-38fe-4ae9-ae80-3550c93b157b'; -- word-choice
UPDATE lesson_examples SET lesson_id = '29b59c9d-ef2e-4f7f-aae2-464222884d3a' WHERE lesson_id = '367b813b-fc32-4ddc-9523-2fff7f812679'; -- which-choice
UPDATE lesson_examples SET lesson_id = '784a146b-8809-4189-a1b4-4b2fdcaf8199' WHERE lesson_id = '6fba31a5-1fd0-4e59-998d-3d253190b0ad'; -- adding-deleting
UPDATE lesson_examples SET lesson_id = '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4' WHERE lesson_id = '6a4e92d2-a681-42ea-9f0d-d5970c57e9af'; -- logical-placement
UPDATE lesson_examples SET lesson_id = '06685249-874d-431f-9b7f-1c711d64a9cf' WHERE lesson_id = '27a6d67b-48d3-412e-91b7-eafdf9472693'; -- backsolving
UPDATE lesson_examples SET lesson_id = '56a20188-c413-48c6-b1ba-6cbddf9ba247' WHERE lesson_id = 'ed3be60b-32d3-449a-9e05-5aa55d206f01'; -- substitution
UPDATE lesson_examples SET lesson_id = '3e2c98a9-98e3-40e3-8301-11f38aa0c15b' WHERE lesson_id = 'dc81f5d7-5b53-43ad-8f51-9d4b6b087adb'; -- geometry-angles
UPDATE lesson_examples SET lesson_id = 'da718634-9257-4c01-845e-a948650dd68c' WHERE lesson_id = 'e42f00eb-537b-4b52-8a59-a8c7a2ce9d2d'; -- exponential-growth
UPDATE lesson_examples SET lesson_id = 'ec9b95cf-47f7-4c01-8118-91aef61f7170' WHERE lesson_id = '55198c60-b5be-4944-932d-dd4be7043571'; -- word-problems
UPDATE lesson_examples SET lesson_id = '58a3fd6e-a958-498a-91eb-935f5fa281af' WHERE lesson_id = '3f98a5df-a538-4f67-8a85-418dbc9ee657'; -- reading-approaches
UPDATE lesson_examples SET lesson_id = '11c2f823-445d-4d13-8083-3d0599aa8613' WHERE lesson_id = '8152c285-9f20-4a04-8703-a3b118b05681'; -- reading-intro
UPDATE lesson_examples SET lesson_id = 'c22d531f-b59a-41fe-8b19-bf2f8e063b48' WHERE lesson_id = 'b5902feb-786f-48bb-b58b-f4e47ca9a311'; -- words-in-context
UPDATE lesson_examples SET lesson_id = '050df26d-52a1-4cd1-80bf-2bf64cb4923a' WHERE lesson_id = '915240f6-791a-45b0-8101-4dd839d33299'; -- working-backwards
UPDATE lesson_examples SET lesson_id = '4ca7c266-f0e2-48ff-adbd-204ae486d503' WHERE lesson_id = '753da37d-37b6-4590-ba52-13d173170c14'; -- approximation
UPDATE lesson_examples SET lesson_id = '65784d86-bf0d-4dbe-aca9-a6fca2383101' WHERE lesson_id = '83733ec8-968f-4ba3-8b91-f7e7e12540f1'; -- equations-as-answers
UPDATE lesson_examples SET lesson_id = '749af103-4c42-4b62-9b8b-5448836e8804' WHERE lesson_id = 'e9416157-f146-4cac-bcf2-0b0b6543a7e0'; -- getting-started
UPDATE lesson_examples SET lesson_id = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac' WHERE lesson_id = '4998d0fa-2f94-44ef-82c7-089a1a9b6419'; -- sentence-structure
UPDATE lesson_examples SET lesson_id = '66776383-9334-4efb-bd72-74b1bbeab8ac' WHERE lesson_id = 'd64c1392-8d2f-4ae5-b63a-b3df35b475ff'; -- punctuation
UPDATE lesson_examples SET lesson_id = '9eef3d0e-d5a2-4104-b9a9-3e575e8e6734' WHERE lesson_id = '180cc54f-7ac9-46a1-8e6b-ec8bb9f8341d'; -- redundancy
UPDATE lesson_examples SET lesson_id = '7aae3763-017b-4762-ad5a-346aac1f027b' WHERE lesson_id = 'b8d75097-0dfe-4281-865a-02e0f97af8f4'; -- transitions
UPDATE lesson_examples SET lesson_id = '8d9e41b9-d906-48f6-a1d3-eecb02a7be9f' WHERE lesson_id = 'c4dbe098-1aba-4eca-b910-59d6ca286425'; -- 3.1
UPDATE lesson_examples SET lesson_id = 'b5f5c943-7bcd-431a-aa94-df51be6612e2' WHERE lesson_id = '7c8e0a76-4c04-4e93-b01a-855774fc05ec'; -- 6.3
UPDATE lesson_examples SET lesson_id = '9fec6937-fba1-40f2-9a28-5ff838420384' WHERE lesson_id = 'ef9de680-3ee8-4edb-a275-7e4a5cc06957'; -- systems-equations
UPDATE lesson_examples SET lesson_id = 'f7516c41-afb2-48fb-a4e2-df9fe41d8b23' WHERE lesson_id = '80ef4f0c-9624-4197-8a44-38c39b233f05'; -- quadratics
UPDATE lesson_examples SET lesson_id = '89b5a825-cb28-4e50-a4a7-de9d73922bc9' WHERE lesson_id = '774b812a-0d5a-4864-ba21-a75b038aa482'; -- functions
UPDATE lesson_examples SET lesson_id = 'c3c04aee-0641-470f-97d1-eeabce912c87' WHERE lesson_id = 'b6585462-227e-4ed4-82c9-8b35cf51b4b1'; -- transforming-functions
UPDATE lesson_examples SET lesson_id = 'ad844a99-7156-4315-ac86-958f52468df2' WHERE lesson_id = '2a75b87d-363b-4e98-be40-3595d02fc5bc'; -- sequences
UPDATE lesson_examples SET lesson_id = 'a0cddccc-a9e8-4ec0-a0b2-ef1cc46a161a' WHERE lesson_id = '8ea0f3ec-4aa0-463c-8754-aced48caa47d'; -- trigonometry
UPDATE lesson_examples SET lesson_id = '0090877d-e7d2-4ac4-80b4-87a42502a214' WHERE lesson_id = '35f72544-4879-4953-8f1a-93d0bccc3881'; -- complex-numbers
UPDATE lesson_examples SET lesson_id = '6e95c291-2e8a-4ae9-8f7e-10caad8588b9' WHERE lesson_id = 'db730c8f-86bd-4332-a418-08ceeab9ef2e'; -- matrices
UPDATE lesson_examples SET lesson_id = '7af23229-16aa-4455-a777-66cdd8011dff' WHERE lesson_id = 'b4c6b4d5-44e4-400d-800f-b5aa57ebf73f'; -- vectors
UPDATE lesson_examples SET lesson_id = '15d5d79e-44fe-4aa6-a257-9e6260c83720' WHERE lesson_id = '57c4e282-fe08-48f9-9ac9-0fe52622b1d7'; -- miscellaneous-topics
UPDATE lesson_examples SET lesson_id = 'a8cd8513-f0a8-4bb1-9890-f21dc053939a' WHERE lesson_id = 'f3943fb8-a002-4b74-b1b8-4626c7f94110'; -- 3.2
UPDATE lesson_examples SET lesson_id = 'aaea35f0-81c0-4b3e-930c-d13edeeb3db5' WHERE lesson_id = 'c3782773-57ff-4933-b56f-daa6367ad4c5'; -- 6.4
UPDATE lesson_examples SET lesson_id = 'b8c03bf0-99df-460d-be21-0015eebe7920' WHERE lesson_id = '237cb56a-2c5a-4025-a9bd-208bf5521a06'; -- 3.3
UPDATE lesson_examples SET lesson_id = '74013e77-3111-4dc6-beca-ff15948e4351' WHERE lesson_id = '783c223f-61cc-40b7-af42-642aae93d1bb'; -- 5.1
UPDATE lesson_examples SET lesson_id = 'd946c7ef-0543-46fd-a938-79592c05c044' WHERE lesson_id = 'd27e1501-3a93-4a41-a345-be698445189f'; -- 5.6
UPDATE lesson_examples SET lesson_id = '6203e4a3-6648-4e0c-9c31-52e35ee2c735' WHERE lesson_id = 'd84d42b7-3eae-4ffb-a100-20dd7f7e4ddf'; -- 5.2
UPDATE lesson_examples SET lesson_id = '27833f99-7aa1-4e5d-92e4-c953fadebc0d' WHERE lesson_id = 'af71b8f5-5828-4f94-889a-b4421e866538'; -- 5.3
UPDATE lesson_examples SET lesson_id = 'c59913aa-4a4e-4bc3-bdaf-596b9414ff81' WHERE lesson_id = '576f7cbf-66e7-4a2f-bdf5-ca16e3804260'; -- 5.4
UPDATE lesson_examples SET lesson_id = 'd2ae4a84-cb54-4006-8dee-8c325e443c2d' WHERE lesson_id = 'ea05b2e7-a62c-43e0-a231-3259930ce1df'; -- 2.2
UPDATE lesson_examples SET lesson_id = '4d711b65-dcda-4fb5-9740-7bfaae194ff2' WHERE lesson_id = '08e5d75d-42d5-47b8-b056-660317a3b3b6'; -- 5.5
UPDATE lesson_examples SET lesson_id = '8e92077d-ae10-48ce-a80d-348cc56969c3' WHERE lesson_id = '6ba82f91-5aff-44de-b4f0-5864d186410c'; -- 2.3
UPDATE lesson_examples SET lesson_id = '4b3fd0c3-4de3-4e74-bd87-f78f5fb0ad17' WHERE lesson_id = '2bf9fd19-b824-4ea0-9a31-789b8075f7ce'; -- 6.1
UPDATE lesson_examples SET lesson_id = '928ee683-cf5c-46ab-a148-77da4e887e3b' WHERE lesson_id = '6f78adaf-6ae4-4faa-bb53-c63dc4788262'; -- 2.4
UPDATE lesson_examples SET lesson_id = 'cd5f10f6-2970-4d73-82b1-029645565ae7' WHERE lesson_id = '846683db-f2db-4529-a33b-b76bec57a2bc'; -- 6.2
UPDATE lesson_examples SET lesson_id = 'a0fbdb59-614b-4597-99c1-344c4f3ad47e' WHERE lesson_id = '9d4d580c-0f7c-4357-8bb8-2ff196c22b78'; -- 3.4
UPDATE lesson_examples SET lesson_id = '60e3cd06-406b-45bc-b9d7-e887ef8eeca6' WHERE lesson_id = '9743b6ea-e0bd-4432-a7b2-efc5c10aef94'; -- 3.5
UPDATE lesson_examples SET lesson_id = '34e50480-0a09-4f9f-add4-c1121f66776b' WHERE lesson_id = 'ff17e031-69fb-4085-828f-303a49038c13'; -- 3.6

-- Step 3: Add new foreign key constraint
ALTER TABLE lesson_examples
  ADD CONSTRAINT lesson_examples_lesson_id_fkey
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE;
