@isTest
private class TestExpCustomPageHelper {

    static testMethod void testGetPage() {
    	
    	ExpCustomPageHelper helper = new ExpCustomPageHelper();
    	System.assertNotEquals(null, helper.getPage('/apex/'));
    	
    }

}