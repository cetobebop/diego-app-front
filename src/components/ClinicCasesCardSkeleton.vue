<template>
    <template v-for="(value) in 2" :key="value">
        <div class="my-card col-xs-12 col-sm-5  q-mb-sm" style="min-width: 130px;">
            <q-card  bordered flat>
              
                <div class="q-pa-sm">
                    <q-skeleton type="text" />
                    <q-skeleton type="text" />
                    <q-skeleton type="text" />
                </div>
                                         
                
            </q-card>
        </div>
    </template> 
</template>


<style scoped>




@media (600px < width) {
    
    .my-card{
        margin-right: 5px;
    }
   
}

</style>