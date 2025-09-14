<template>
    <div  class="q-px-md justify-center q-gutter-sm row wrap">
        <template v-for="value in 5" :key="value">
            <q-card class="col-xs-10 col-sm-4 col-md-3" flat bordered  style="min-width: 250px">
                <q-card-section>
                    <q-skeleton type="rect" />
                </q-card-section>

                <q-separator />

                <q-card-section>
                    <div class="row no-wrap items-center">
                        <div  class="col-8 q-mr-xs">
                            <q-skeleton type="text" />
                        </div>
                        <div class="col items-center">
                            <q-skeleton type="text" />
                        </div>
                    </div>
                    <q-skeleton type="text" />
                    <q-skeleton type="text" />
                    <q-skeleton type="text" />
                    <q-skeleton type="text" />
                    <q-skeleton type="text" />
                </q-card-section>

                <q-card-section  >
                    <q-skeleton type="QBtn" class="full-width" />
                </q-card-section>
            </q-card>
        </template>

    </div>
</template>
