<template>
    <q-card style="min-width: 280px; max-width: 600px">
        <q-card-section class="row items-center content-center  q-pb-none">
            <q-skeleton type="text" class="col-9" />
            <q-skeleton type="text" class="col q-ml-xs"/>
        </q-card-section>

        <q-card-section>
            <q-skeleton type="text"/>
            <q-skeleton type="text" />
            
            <div class="row q-mt-sm">
                <q-skeleton type="QBtn" class="full-width" />
                <q-skeleton type="QBtn" class="full-width q-mt-xs" /> 
            </div>
        </q-card-section>
    </q-card>
</template>