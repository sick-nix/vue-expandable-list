# Challenge

- Make a component which displays a list of string as cells.
- By clicking between you can add an item to the list.
- You can edit the values of the existing items

# Usage

Use v-model:items and pass a string array.

That way you can edit existing cells, add cells and on blur or when pressing enter the v-model will be triggered.

To watch any triggered changes on the list passed as input, you have to use the deep option in watch.
