# V - Treeview
V - Treeview is a Vue 3 component with drag n drop and collapse functionality.

## Installation

> npm i @evangelos_bitsilis/v-treeview

## Configuration (optional)

```Javascript
{
  colors: {
    indicators: {
      text: "White",
      lines: "RoyalBlue",
      background: "RoyalBlue",
  	},
    ghost: {
      text: "White",
      background: "RoyalBlue"
  	},
    notDraggable: {
      text: "Red"
    }
  }
}
```

| Color Config | Type | Default | Description |
| ------------ | ---- | ------- | ----------- |
| indicators | object | - | Holds tree's indicator colors |
| indicators.text | string | "White" | Changes the color of the hovering element's text. Works in conjunction with the background color |
| indicators.lines | string | "RoyalBlue" | Changes the indicator lines color |
| indicators.background | string | "RoyalBlue" | Changes the background color of the hovering element |
| ghost | object | - | Contains ghost element's colors  |
| ghost.text | string | "White" | Ghost's text color |
| ghost.background | string | "RoyalBlue" | Ghost's background color |
| notDraggable | object | - | Contains the colors of the elements which can't be dragged |
| notDraggable.text | string | "Red" | Text color |

## Data structure

```Javascript
[{
  "id": 1,
  "text": "Root",
  "state": {
    "expanded": true,
    "draggable": true,
    "droppable": true
  },
  "children": [{
    "id": 2,
    "text": "Child",
    "state": {
      "expanded": true,
      "draggable": true,
      "droppable": true
    },
    "children": []
  }]
}]
```
> Make sure it's a reactive property

### Node properties
| Property | Type | Required | Description |
| -------- | ---- | ---------| ----------- |
| id | integer | true | Used in the tree to differentiate each node |
| text | string | true | Displayed text |
| state | object / [State](#nodes-state) | true | Node's state |
| children | array | true | An array with node's children. If any |

#### Node's state
| State | Type | Default | Description |
| ----- | ---- | ------- | ----------- |
| expanded | boolean | true | Determines if the node is expanded or not |
| draggable | boolean | true | Determines if the node can be dragged |
| droppable | boolean | true | Determines if nodes allowed to be dropped |

## Initialization
```Vue
<template>
  <Tree :data="data">
</template>

<script setup>
  import Tree from "@evangelos_bitsilis/v-treeview"
  import "@evangelos_bitsilis/v-treeview/dist/style.css";

  import someData from "someFile.json"
  const data = reactive(someData);
</script>
```

### Events

**treeMounted**
Emitted when the tree is mounted

**orderChanged**
Emitted every time the order of the tree nodes changes. And returns the updated tree structure.

```Vue
<template>
  <Tree :data="data" @orderChanged="foo"/>
</template>

<script setup>
  import Tree from "@evangelos_bitsilis/v-treeview"
  import "@evangelos_bitsilis/v-treeview/dist/style.css";

  import someData from "someFile.json";
  const data = reactive(someData);

  function foo(newData) {
    console.log(newData);
  }
</script>
```

### Custom HTML

The Tree has 2 normal slots that can be used to add content before and after the node's default text

```Vue
<Tree :data="data">
  <template #before="data">
    <div style="margin-right: 20px;">
      before {{ data.item.id }}
    </div>
  </template>
	
  <template #after="data">
    <div style="margin-left: 20px;">
      after {{ data.item.id }}
    </div>
  </template>
</Tree>
```