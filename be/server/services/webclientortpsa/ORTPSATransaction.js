const { cpool } = require('../../db/sql');

class ORTPSATransaction {
  constructor() {
    this.id = null;
    this.acknowledgementNumber = '';
    this.transactionId = '';
    this.requestType = '';
    this.receiptId = '';
    this.status = '';
    this.departmentId = '';
    this.serviceId = '';
    this.applicationId = '';
    this.created = new Date().toISOString();
    this.updated = null;
  }

  static generateTransactionId(acknowledgementNumber, count) {
    
    return `${acknowledgementNumber}T${++count}`;
  }

  static create(acknowledgementNumber, requestType, count, serviceId, departmentId, applicationId) {
    const instance = new ORTPSATransaction();
    instance.acknowledgementNumber = acknowledgementNumber;
    instance.requestType = requestType;
    instance.transactionId = ORTPSATransaction.generateTransactionId(acknowledgementNumber, count);
    instance.serviceId = serviceId;
    instance.departmentId = departmentId;
    instance.applicationId = applicationId;
    return instance;
  }

  setId(id) {
    this.id = id;
  }

  static async getCountByAcknowledgementNumber(acknowledgementNumber) {
    try {
      const result = await cpool.request()
        .input('acknowledgementNumber', acknowledgementNumber)
        .query(`SELECT COUNT(*) as count FROM [jform].[dbo].[transaction_ortpsa] WHERE acknowledge_no = @acknowledgementNumber`);

      return result.recordset[0].count || 0;
    } catch (err) {
      console.error('Error fetching count:', err);
      throw err;
    }
  }

  async save() {
    try {
    
      // const checkExisting = await cpool.request()
      //   .input('trs_id', this.transactionId)
      //   .query(`
      //     SELECT * FROM [jform].[dbo].[transaction_ortpsa] 
      //     WHERE trs_id = @trs_id
      //   `);
      //     console.log("testing save 1",this.transactionId,checkExisting);
      // if (checkExisting.recordset.length == 0) {
        const result = await cpool.request()
          .input('acknowledge_no', this.acknowledgementNumber)
          .input('trs_id', this.transactionId)
          .input('request_type', this.requestType)
          .input('receipt_id', this.receiptId)
          .input('status', this.status)
          .input('department_id', this.departmentId)
          .input('service_id', this.serviceId)
          .input('app_id', this.applicationId)
          .input('created', this.created)
          .input('updated', this.updated)
          .query(`
          INSERT INTO [jform].[dbo].[transaction_ortpsa]
          (acknowledge_no, trs_id, request_type, receipt_id, status, app_id, department_id, service_id, created, updated)
          OUTPUT INSERTED.id
          VALUES (@acknowledge_no, @trs_id, @request_type, @receipt_id, @status, @app_id,@department_id, @service_id, @created, @updated)
        `);

        this.id = result.recordset[0].id;
        return this.id;
      // }
      // else {
      //   return { message: "Duplicate Data exist.." }
      // }

    } catch (err) {
      console.error('Error saving transaction:', err);
      throw err;
    }
  }

  async updateProps(receiptId, status) {
    this.receiptId = receiptId;
    this.status = status;
    this.updated = new Date().toISOString();
    return this.updateStatus();
  }

  async updateStatus() {
    try {
      const result = await cpool.request()
        .input('receipt_id', this.receiptId)
        .input('status', this.status)
        .input('updated', this.updated)
        .input('id', this.id)
        .query(`
          UPDATE [jform].[dbo].[transaction_ortpsa]
          SET receipt_id = @receipt_id,
              status = @status,
              updated = @updated
          WHERE id = @id
        `);
      return result.rowsAffected[0]; // Number of rows updated
    } catch (err) {
      console.error('Error updating transaction:', err);
      throw err;
    }
  }

  toArray() {
    return {
      id: this.id,
      acknowledgement_number: this.acknowledgementNumber,
      transaction_id: this.transactionId,
      request_type: this.requestType,
      receipt_id: this.receiptId,
      status: this.status,
      department_id: this.departmentId,
      service_id: this.serviceId,
      created: this.created,
      updated: this.updated,
    };
  }
}

module.exports = ORTPSATransaction;
