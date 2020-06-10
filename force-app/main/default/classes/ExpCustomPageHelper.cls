global without sharing class ExpCustomPageHelper implements ExpECM.IExpCustomPageHelper {

    global PageReference getPage(String url) {
        return new PageReference(url);
    }
}