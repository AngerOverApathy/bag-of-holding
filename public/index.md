<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dimensional Depot: Loot Log</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>

    <h1>Dimensional Depot</h1>

    <label for="userInput">Search for items to add to your character's inventory:</label>
    <input type="text" id="userInput" name="userInput">
    <button id="submit">Add Item</button>

    <div class="container">
        <div class="column">
            <h2>Equipment</h2>
            <ul id="equipment"></ul>
        </div>
        <div class="column">
            <h2>Magic Items</h2>
            <ul id="magic-items"></ul>
        </div>
    </div>

    <div class="section">
        <div class="section-header" onclick="toggleForm()">Click here to create a non-magical item</div>
        <form id="equipmentForm" action="/" method="POST" class="section-content">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"><br><br>
    
        <label for="category">Category:</label>
        <input type="text" id="category" name="category"><br><br>
    
        <label for="damage_dice">Damage Dice:</label>
        <input type="text" id="damage_dice" name="damage_dice"><br><br>
    
        <label for="damage_type">Damage Type:</label>
        <input type="text" id="damage_type" name="damage_type"><br><br>
    
        <label for="two_handed_damage_dice">Two-Handed Damage Dice:</label>
        <input type="text" id="two_handed_damage_dice" name="two_handed_damage_dice"><br><br>
    
        <label for="two_handed_damage_type">Two-Handed Damage Type:</label>
        <input type="text" id="two_handed_damage_type" name="two_handed_damage_type"><br><br>
    
        <label for="range">Range:</label>
        <input type="number" id="range" name="range"><br><br>
    
        <label for="throwRange_normal">Throw Range (Normal):</label>
        <input type="number" id="throwRange_normal" name="throwRange_normal"><br><br>
    
        <label for="throwRange_long">Throw Range (Long):</label>
        <input type="number" id="throwRange_long" name="throwRange_long"><br><br>
    
        <label for="properties">Properties:</label>
        <input type="text" id="properties" name="properties"><br><br>
    
        <label for="equipmentCategory">Equipment Category:</label>
        <input type="text" id="equipmentCategory" name="equipmentCategory"><br><br>
    
        <label for="weight">Weight:</label>
        <input type="number" id="weight" name="weight"><br><br>
    
        <label for="cost_quantity">Cost Quantity:</label>
        <input type="number" id="cost_quantity" name="cost_quantity"><br><br>
    
        <label for="cost_unit">Cost Unit:</label>
        <input type="text" id="cost_unit" name="cost_unit"><br><br>
    
        <label for="desc">Description:</label>
        <textarea id="desc" name="desc"></textarea><br><br>
    
        <input type="submit" value="Create">
    </form>
    </div>

    <script src="./js/app.js"></script>
</body>
</html>
