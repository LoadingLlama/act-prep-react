const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = "https://rabavobdklnwvwsldbix.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y";
const supabase = createClient(supabaseUrl, supabaseKey);

const idsToDelete = [
  '2e123eaa-bd1c-41ad-8ef0-cc7cfce3e4a1', '7e1ee6c3-155c-4f96-8316-bcf5647ca1bc', 'e2fc85b7-cfe2-4684-a5aa-bd5acbc08813',
  '9c800d49-f512-45b8-954d-486d75a07c46', '0c5811c3-3bca-4ba3-96fb-9277fb5b3498', 'b9f168ae-40f4-464d-b5b3-014dd7e7183a',
  '4d947df4-3547-45a9-a52a-325161d6cc2b', 'e4c964a6-d98b-4aad-bcb5-d5a0b06011f8', 'ee692168-241c-4c1e-b66a-fa2cffc2f989',
  '93d473d5-e8bb-45a5-9d69-fec1b5997f06', '2cb10b4a-ecb7-42ed-88aa-57ec9b146d7c', 'eabcf3f2-f66e-43f3-a76c-d32421b8997c',
  '8a7ea3ea-6c00-4571-b1a5-b9364656e537', '0ed0cb05-5432-4d8c-9f1d-cfb469152d50', '4964df40-9675-4b1b-ab99-2ba688a44rd3',
  'ada2bfb8-1256-4baa-a915-807dde0888bf', '8df0fd75-b2c9-4526-9703-9a0f509c443d', 'b9c4ab6c-4c63-4192-991f-22c69bc82c9f',
  'f969d6dc-6e3a-4e3d-a04a-a9ca40ba161f', '33338583-21fb-46b4-9ed6-f853a5209aba', '9eabb929-ac6c-49d7-950f-97d7a2252936',
  '7ddec417-2e9d-4fcb-a7a6-1e337e5d7cd2', 'e7772b8e-b094-49ff-a6f7-e1ed21b04523', 'a4b2d62e-8fe3-4917-96f1-4025db28f818',
  '7b1d832f-99a0-4b45-883f-8910d927e4e5', 'dc5c794c-af08-4ae2-9977-62e2a72a6189', '4d8b2e88-a775-49f2-8719-6004382093d1',
  '77e37bfe-ddb3-4e2f-8be3-b9cfe1c2329c', '8a46c52a-de5d-435a-9f54-1152b5f88ce9', 'b9f1cdbf-007a-4e04-bb83-eab39a5ad500',
  '4eaa1744-8b97-4ffb-b71e-529864f62bfc', '1002a59d-1e20-4846-b0e4-c2da349fd99e', 'b5458dea-5a2d-468d-a416-1a7c584a8c00',
  '18561104-dd92-4fba-a083-dfb18dbd9ed8', '98f3193d-c3be-4f30-ae65-11cceae50f6a', '4766ca39-a21c-4450-a7ef-bbf7839eab98',
  'd0ffd133-75e7-411a-9290-71e1e517f835', '96816271-f6cf-4462-90a4-f184fb85e3d0', 'ca916928-5504-4e43-9b87-109241038066',
  '8c15f327-ba7f-4d6a-88a4-914c8f5d3552', 'bc1ea9a8-231a-4c29-908a-e1719e0c8186', '1d3e3d26-62ec-4447-8240-69657e794e2a',
  '60582ebf-e8a8-4b50-8441-7dbef37716f0', '6864f513-3683-4fcd-9f9a-8c8001add392', '867498ec-d6ba-4dc9-852a-9669f2999418',
  'edeab2c0-863f-413b-bc46-7eb5775bc5ca', '23b1e26d-89f0-4890-bc9d-6395019393d2', '632c6ee6-50d9-4321-8092-99d683219759',
  'c2134ee3-d9de-4157-817b-af7471e8ab80', 'd36e1a03-2b0e-4d25-9d9d-d15bf297c51b', 'b7d97ab4-357f-4544-8067-8f80527eedd1',
  '8455c025-49b4-4961-b035-5ee1049a1de1', '887453d0-aa6d-40a1-bb1f-c37aede3e8e9', 'e762d003-1825-42c4-a6e2-171db2417849',
  '9d9c5bb1-79f6-43d3-9d1c-43d343ffc696', 'e40c1f3a-bab7-4c8c-84cb-4fc26566ad06', 'f6beb146-123f-46cf-8bc5-09691ed65c4e',
  'ae25f3da-0818-43fe-9358-088aa671c267', 'd1eb1feb-3c60-4356-9397-eb09a22a8229', '9b8a25c7-259b-4643-8fca-979ee7b7994c',
  'a209bb12-6bb9-4811-9ffb-1ee421a9eebd', 'd2dd9c7e-60a2-4f6e-9ef8-772b3037e338', '2f6247b8-015f-4b4b-83c9-4454adbde9c2',
  'abb7f776-32a6-4d89-ba6c-1e8995b21ba4', '3d7fd97d-fa53-434b-98f7-29a8bbcaec0a', 'd1d8de93-e8e5-48fe-a413-1513dd738a28',
  'a2a5d72b-8c6f-466f-9aab-d0126f1f8f16', '33904572-033b-456e-9536-4ec476d3c11b', '239576a2-e6bf-4881-930f-b2af27c2e1c2',
  '64317eb9-9c8f-48aa-9c85-f841386cdff5', 'd0e5018d-bfd1-477b-bea1-d8180dd26b69', '4779d340-3fde-40dc-84aa-40ee6cb9d04a',
  '1a2c6e3e-5191-4972-a03a-a58e2e825db0', '78c176bd-a2a2-480a-98c1-a5b598acce56', 'c8ce9dd3-d84d-42d4-a788-12e51b99a6de',
  '78334c55-304d-4f1d-9d39-75afc596f825', 'a282c61b-e1e6-49a7-8bf1-c73f5303cb0f', '00c5f9e4-c6df-44be-9043-0607c84511a7',
  'c9fac51a-09b9-4b51-80b5-54f7bd35c4fc', '113635da-ec55-45ef-b25d-3b2d894a05fc', '00697c37-e77d-40dc-ad32-030ba4d08561',
  '641083bb-2bc9-4305-8abe-91805633e527', '7e294bfc-2a73-459e-b1eb-63af5aff6e55', '4eedde8f-4ddd-43e4-8b66-ea95d7acae02',
  '475f59a4-ecae-42e6-ba6f-99f0a356425b', '5407ad1b-c838-442d-a066-51dc200424f7', 'aeaf7810-4919-4c96-abc1-1e59efb7082c',
  '76ddddf1-cfb6-499d-85fa-5b3f9fe019b2', '993cfc97-0916-4640-96fe-964e1f0cb8f0', 'e8a44d39-4d87-4c6f-8c05-7955982ea617',
  'da8fc4b4-a5fb-4858-b6f0-79bb813da5ae', '3de4e172-c4d4-42c5-916c-593d6448c08a', '421261dc-ee0e-4daa-92bd-b18c03330a40',
  '81c1db4b-e9d7-487c-bd0d-369fe6d774aa', 'b8e84a14-266a-4bae-96cb-4da060d435fe', '3ac61ebe-59ba-424b-9c10-796736011b3e'
];

async function deleteQuestions() {
  console.log(`Deleting ${idsToDelete.length} duplicate questions...\n`);

  let deletedCount = 0;
  let errors = [];

  for (const id of idsToDelete) {
    const { error } = await supabase
      .from('lesson_examples')
      .delete()
      .eq('id', id);

    if (error) {
      errors.push({ id, error });
      console.error(`✗ Failed to delete ${id}:`, error.message);
    } else {
      deletedCount++;
      if (deletedCount % 10 === 0) {
        console.log(`Deleted ${deletedCount}/${idsToDelete.length}...`);
      }
    }
  }

  console.log(`\n✓ Successfully deleted ${deletedCount} questions`);
  if (errors.length > 0) {
    console.log(`✗ ${errors.length} errors occurred`);
  }
}

deleteQuestions();
