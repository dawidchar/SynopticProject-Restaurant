export default timestamp => timestamp.seconds ? timestamp.seconds : Math.floor(new Date(timestamp).getTime() / 1000)
