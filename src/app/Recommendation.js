import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import {Avatar} from "@nextui-org/avatar";

const Recommendation = () => {
  return (
    <Card isBlurred className="flex-col items-center py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-xl font-bold">Chicken Pasta Bake</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Avatar className=" w-40 h-40 text-large" size='lg' radius='full' src='https://s3-alpha-sig.figma.com/img/7480/fb84/1c592459ee254d3881ebc6a81164ef0d?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aXUejrxPp3BUR61TSIMVormeYjcDF5W85tPxlYN8wkv0LdqEETDy~hnkm93P96OzQHs1kpL3pIzW9WdGYCvqob54vtyCj1UD0-oNXBNZwzpfg1ZksR-AOzI9jPAACa0KmXkkcurldE~NtCa8qPkWV30J8xP7V-cqOZbIFzKIVUE3BLKJP-qIrJBHrjUJyTxivNrtdFY~ZoNN9br6mFiVzMSxKyC6EYAHUBfU02-vYQHIK6w04brUOyaKv4dHNoP9ieBWAryZBlSUzxcvonPU4spEiW7wRZeEO6cAoM5lFgKJjzXT1MnQtROjFJxR~xrQ~Jm9ltQzrmN0zNu31NU1cw__'/>

      </CardBody>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny font-bold">A nice change from the usual creamy versions, this chicken pasta bake is made with a tomato pasta sauce</p>
      </CardHeader>
      
    </Card>
  )
}

export default Recommendation
